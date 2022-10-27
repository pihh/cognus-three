import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Color } from 'three';

function makeid() {
  var length = 10;
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default class ObjectsShoeComponent extends Component {
  constructor() {
    super(...arguments);
    this.initWormhole();
  }
  @service cognusScene;
  @tracked state = {
    current: null,
    hovered: null,
    items: {
      laces: '#ffffff',
      mesh: '#ffffff',
      caps: '#ffffff',
      inner: '#ffffff',
      sole: '#ffffff',
      stripes: '#ffffff',
      band: '#ffffff',
      patch: '#ffffff',
    },
  };

  initWormhole() {
    this.destinationElement = document.createElement('div');
    document.body.appendChild(this.destinationElement);
  }

  @action
  onColorChange(color) {
    this.state.current.color = new Color(color);
  }
  @action
  didInsert() {
    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
      // resource URL
      'textures/shoe-draco.gltf',
      // called when the resource is loaded
      (gltf) => {
        // console.log({ gltf });
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.recieveShadow = false;
          }
        });

        this.gltf = gltf;
        this.meshes = gltf.scene.children[0].children;

        const self = this;
        const cognusScene = this.cognusScene;
        const meshes = this.meshes;

        this.cognusScene.addComponent(
          {
            type: 'objects',
            object: gltf.scene,
            arguments: [],
            intersected: false,
            init() {
              // Add target to service
              let targetX = makeid();
              let targetY = makeid();

              cognusScene[targetX] = 0;
              cognusScene[targetY] = 0;

              // add arguments
              this.arguments.push({ targetX: cognusScene[targetX] });
              this.arguments.push({ targetY: cognusScene[targetY] });

              // Custom functions:
              cognusScene.changeShoeColor = (color, material) => {
                color = new Color(color);
                let mesh = meshes[0];
                if (material == 'sole') {
                  mesh = meshes[1];
                  mesh.material.color = color;
                } else if (material == 'stripes') {
                  mesh = meshes[2];
                  mesh.material.color = color;
                } else if (material == 'band') {
                  mesh = meshes[3];
                  mesh.material.color = color;
                } else if (material == 'caps') {
                  mesh = meshes[4];
                  mesh.material.color = color;
                } else if (material == 'patch') {
                  mesh = meshes[5];
                  mesh.material.color = color;
                } else if (material == 'inner') {
                  mesh = meshes[6];
                  mesh.material.color = color;
                } else if (material == 'laces') {
                  mesh = meshes[7];
                  mesh.material.color = color;
                } else {
                  console.warn(
                    'invalid material ',
                    material,
                    'plase use one of: ',
                    self.state.items.keys()
                  );
                }
              };
              // Add onClick events
              for (let mesh of meshes) {
                mesh.castShadow = true;
                if (mesh.material.metalness < 1) {
                  mesh.material.metalness = 0;
                  mesh.material.roughness = 0;
                }
                // mesh.material.map = textureFloor;
                mesh.material.needsUpdate = true;
                mesh.rootUUID = this.object.uuid;
                mesh.click = (e) => {
                  this.intersected = true;
                  self.state.current = mesh.material;
                  self.state = {
                    ...self.state,
                  };
                };

                mesh.hover = (e) => {
                  this.intersected = mesh;
                  this.hover(e);
                };
              }
              cognusScene.pubsub.publish('object-initialized', this.object);
            },
            render() {
              // Floating animation
              cognusScene[this.arguments.targetX] = cognusScene.mouseX * 0.001;
              const elapsedTime = cognusScene.elapsedTime;
              for (let mesh of meshes) {
                mesh.rotation.z = -0.2 - (1 + Math.sin(elapsedTime / 1.5)) / 20;
                mesh.rotation.x = Math.cos(elapsedTime / 4) / 8;
                mesh.rotation.y = Math.sin(elapsedTime / 4) / 8;
                mesh.position.y = (1 + Math.sin(elapsedTime / 1.5)) / 10;
              }
            },
            scroll(e) {
              // console.log(e);
              // sphere.position.y = window.scrollY * 0.001;
            },
            clickOutside(e) {
              self.state.current = null;
              self.state = {
                ...self.state,
              };
            },
            hover(e) {
              if (this.intersected) {
                this.updateCursor(true);
              }
            },
            hoverEnd(e) {
              if (this.intersected) {
                this.intersected = false;
                this.updateCursor();
              }
            },
            updateCursor(custom) {
              if (this.intersected) {
                const name = this.intersected.material.name;
                const color =
                  '#' + this.intersected.material.color.getHexString();

                const cursor = `
                  <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
                      <g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${color}"/></g>
                      <path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
                      <text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em">
                        <tspan x="35" y="63">${name}</tspan>
                      </text>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                          <path fill="#fff" d="M0 0h64v64H0z"/>
                        </clipPath>
                        <filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                          <feOffset dy="2"/>
                          <feGaussianBlur stdDeviation="3"/>
                          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                      </defs>
                    </svg>`;
                const auto = `
                  <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
                    <path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
                  </svg>`;

                document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
                  cursor
                )}'), auto`;
              }
            },
          },
          { async: true }
        );
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
