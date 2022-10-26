import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import {
  WebGLRenderer,
  Clock,
  Raycaster,
  Vector2,
  PCFSoftShadowMap,
  AxesHelper,
} from 'three';
import * as THREE from 'three';
import * as dat from 'dat.gui';

export default class CognusSceneService extends Service {
  config = {
    resizeCamera: true,
    gui: false,
  };

  @tracked cameras = [];
  @tracked controls = [];
  @tracked lights = [];
  @tracked scenes = [];
  @tracked canvas = [];
  @tracked objects = [];

  @action addComponent(
    component,
    config = {
      async: false,
    }
  ) {
    this[component.type].push(component);
    if (config.async) {
      if (component.init) {
        component.init();
      }
      this.scene.add(component.object);
    }
  }

  @action
  boot() {
    this.canvas = this.canvas[0].object;
    this.scene = this.scenes[0].object;
    this.camera = this.cameras[0].object;

    this.addRenderer();
    this.addCamera();
    this.addLights();
    this.addObjects();

    this.addControls();
    this.addRaycaster();
    this.animate();

    this.addEventListeners();
    this.addGUI();
  }

  addGUI() {
    if (this.config.gui) {
      this.gui = new dat.GUI();
      this.scene.add(new AxesHelper(10));
      for (let [i, light] of this.lights.entries()) {
        if (light.helper) {
          const folder = this.gui.addFolder('light ' + i);
          const folderColor = {
            color: light.color,
          };
          folder.add(light.object.position, 'x').min(-200).max(200).step(0.01);
          folder.add(light.object.position, 'y').min(-200).max(200).step(0.01);
          folder.add(light.object.position, 'z').min(-200).max(200).step(0.01);
          folder.add(light.object, 'intensity').min(0).max(10).step(0.01);

          folder.addColor(folderColor, 'color').onChange(() => {
            light.object.color.set(folderColor.color);
          });

          this.scene.add(light.helper());
        }
      }
    }
  }

  addLights() {
    for (let light of this.lights) {
      this.scene.add(light.object);
    }
  }

  addObjects() {
    for (let object of this.objects) {
      if (object.init) {
        object.init();
      }
      this.scene.add(object.object);
    }
  }

  addCamera() {
    if (this.config.resizeCamera) {
      this.camera.aspect = this.sizes.width / this.sizes.height;
    }
    this.scene.add(this.camera);
  }

  addControls() {
    // console.log({ controls: this.controls[0], self: this });
    this.controls.forEach((el) => {
      el.init(this.camera, this.renderer.domElement);
    });
  }

  addRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
  }

  addRaycaster() {
    this.mouse = new Vector2();
    this.raycaster = new Raycaster();
  }

  elapsedTime = 0;
  animate() {
    const clock = new Clock();

    const tick = () => {
      this.elapsedTime = clock.getElapsedTime();
      // console.log({ elapsedTime });
      // Update objects
      // sphere.rotation.y = .5 * elapsedTime

      for (let object of this.objects) {
        try {
          object.render();
        } catch (ex) {
          console.warn(ex);
        }
      }

      // Update Orbital Controls
      for (let control of this.controls) {
        control.render();
      }

      // Render
      this.renderer.render(this.scene, this.camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      this.onResize();
    });

    this.renderer.domElement.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    });

    this.renderer.domElement.addEventListener('scroll', (e) => {
      this.onScroll(e);
    });

    this.renderer.domElement.addEventListener('click', (e) => {
      this.onClick(e);
      // console.log({ intersects });
      // if (intersects.length > 0) {
      //
      // 	// var object = intersects[0].object;
      //   //
      //   // object.material.color.set( Math.random() * 0xffffff );
      //
      // }

      // }
    });
  }

  mouseX = 0;
  mouseY = 0;
  onMouseMove(e) {
    e.stopPropagation();
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    this.mouseX = e.clientX - windowHalfX;
    this.mouseY = e.clientY - windowHalfY;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.intersects = this.raycaster.intersectObject(this.scene, true);

    for (let object of this.objects) {
      object.intersected = false;
    }
    if (this.intersects.length > 0) {
      const meshUUID =
        this.intersects[0].object.rootUUID || this.intersects[0].object.uuid;
      for (let object of this.objects) {
        const objUUID = object.object.uuid;
        if (meshUUID == objUUID) {
          object.object.intersected = true;
          if (this.intersects[0].object.hover) {
            this.intersects[0].object.hover(e);
          }
        } else {
          object.object.intersected = false;
        }
      }
    } else {
      for (let object of this.objects) {
        object.object.intersected = false;
      }
    }
    this.onMouseOver();
  }

  onMouseOver(e) {
    for (let object of this.objects) {
      if (!object.object.intersected && object.hoverEnd) {
        object.hoverEnd(e);
      }
    }
  }

  onClick(e) {
    if (this.intersects.length > 0) {
      if (this.intersects[0].object.click) {
        this.intersects[0].object.click(e);
      }
    } else {
      for (let object of this.objects) {
        if (object.clickOutside) {
          object.clickOutside(e);
        }
      }
    }
  }
  onScroll(e) {
    for (let object of this.objects) {
      if (object.scroll) {
        object.scroll(e);
      }
    }
  }

  onResize = () => {
    // Update sizes

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  get sizes() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}
