import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Color } from 'three';
import gsap from 'gsap';

export default class ObjectsChatbotComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    // Instantiate a loader
    const cognusScene = this.cognusScene;
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
      // resource URL
      'textures/chatbot.gltf',
      // called when the resource is loaded
      (gltf) => {
        console.log({ gltf });

        this.cognusScene.addComponent(
          {
            type: 'objects',
            object: gltf.scene,
            arguments: [],
            intersected: false,
            init() {
              cognusScene.pubsub.publish('object-initialized', this.object);
              let tl = gsap.timeline();
              this.object.rotation.set(0, 3.3, 0);
              this.object.scale.set(0.74, 0.75, 0.75);
              this.object.position.x = 0;
              tl.to(this.object.rotation, { y: 4.7, duration: 1 });
              tl.to(
                this.object.scale,
                { x: 0.5, y: 0.5, z: 0.5, duration: 1 },
                '-=1'
              );
              tl.to(this.object.position, { x: 1.5, duration: 1 });
              tl.to(this.object.rotation, { y: 4.2, duration: 1 }, '-=1');
            },
            render() {
              // this.object.rotation.set(0, this.object.rotation.y + 0.025, 0);
            },
          },
          { async: true }
        );
        // gltf.scene.traverse(function (child) {
        //   if (child.isMesh) {
        //     child.castShadow = true;
        //     child.recieveShadow = false;
        //   }
        // });
        //
        // this.gltf = gltf;
        // this.meshes = gltf.scene.children[0].children;
        //
        // const self = this;
        // const cognusScene = this.cognusScene;
        // const meshes = this.meshes;
        //
        // this.cognusScene.addComponent(
        //   {
        //     type: 'objects',
        //     object: gltf.scene,
        //     arguments: [],
        //     intersected: false,
        //     init() {
        //       // Add target to service
        //       let targetX = makeid();
        //       let targetY = makeid();
        //
        //       cognusScene[targetX] = 0;
        //       cognusScene[targetY] = 0;
        //
        //       // add arguments
        //       this.arguments.push({ targetX: cognusScene[targetX] });
        //       this.arguments.push({ targetY: cognusScene[targetY] });
        //
        //       // Custom functions:
        //       cognusScene.changeShoeColor = (color, material) => {
        //         color = new Color(color);
        //         let mesh = meshes[0];
        //         if (material == 'sole') {
        //           mesh = meshes[1];
        //           mesh.material.color = color;
        //         } else if (material == 'stripes') {
        //           mesh = meshes[2];
        //           mesh.material.color = color;
        //         } else if (material == 'band') {
        //           mesh = meshes[3];
        //           mesh.material.color = color;
        //         } else if (material == 'caps') {
        //           mesh = meshes[4];
        //           mesh.material.color = color;
        //         } else if (material == 'patch') {
        //           mesh = meshes[5];
        //           mesh.material.color = color;
        //         } else if (material == 'inner') {
        //           mesh = meshes[6];
        //           mesh.material.color = color;
        //         } else if (material == 'laces') {
        //           mesh = meshes[7];
        //           mesh.material.color = color;
        //         } else {
        //           console.warn(
        //             'invalid material ',
        //             material,
        //             'plase use one of: ',
        //             self.state.items.keys()
        //           );
        //         }
        //       };
        //       // Add onClick events
        //       for (let mesh of meshes) {
        //         mesh.castShadow = true;
        //         if (mesh.material.metalness < 1) {
        //           mesh.material.metalness = 0;
        //           mesh.material.roughness = 0;
        //         }
        //         // mesh.material.map = textureFloor;
        //         mesh.material.needsUpdate = true;
        //         mesh.rootUUID = this.object.uuid;
        //         mesh.click = (e) => {
        //           this.intersected = true;
        //           self.state.current = mesh.material;
        //           self.state = {
        //             ...self.state,
        //           };
        //         };
        //
        //         mesh.hover = (e) => {
        //           this.intersected = mesh;
        //           this.hover(e);
        //         };
        //       }
        //       cognusScene.pubsub.publish('object-initialized', this.object);
        // },
        // render() {
        //   // Floating animation
        //   // cognusScene[this.arguments.targetX] = cognusScene.mouseX * 0.001;
        //   // const elapsedTime = cognusScene.elapsedTime;
        //   // for (let mesh of meshes) {
        //   //   mesh.rotation.z = -0.2 - (1 + Math.sin(elapsedTime / 1.5)) / 20;
        //   //   mesh.rotation.x = Math.cos(elapsedTime / 4) / 8;
        //   //   mesh.rotation.y = Math.sin(elapsedTime / 4) / 8;
        //   //   mesh.position.y = (1 + Math.sin(elapsedTime / 1.5)) / 10;
        //   // }
        // },
        //
        // },
        // { async: true }
        // );
      },
      // called while loading is progressing
      (xhr) => {
        // ...
        // console.log({ xhr });
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when loading has errors
      (error) => {
        console.log('An error happened', error);
      }
    );
  }
}
