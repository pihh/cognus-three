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
  @service cognusScene;

  @action
  didInsert() {
    // // Objects

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
        this.gltf = gltf;
        this.meshes = gltf.scene.children[0].children;
        const cognusScene = this.cognusScene;
        const meshes = this.meshes;

        this.cognusScene.addComponent(
          {
            type: 'objects',
            object: gltf.scene,
            arguments: [],
            materials: [
              'sole',
              'stripes',
              'band',
              'caps',
              'patch',
              'inner',
              'laces',
            ],
            init() {
              let targetX = makeid();
              let targetY = makeid();
              cognusScene[targetX] = 0;
              cognusScene[targetY] = 0;
              this.arguments.push({ targetX: cognusScene[targetX] });
              this.arguments.push({ targetY: cognusScene[targetY] });

              // // Custom functions:
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
                    this.materials
                  );
                }
              };
              console.log({ cognusScene });
            },
            render() {
              cognusScene[this.arguments.targetX] = cognusScene.mouseX * 0.001;
              const elapsedTime = cognusScene.elapsedTime;
              for (let mesh of meshes) {
                // mesh.rotation.y = 0.5 * elapsedTime;
                // mesh.rotation.y +=
                //   0.5 * (cognusScene[this.arguments.targetX] - mesh.rotation.y);
                // mesh.rotation.x +=
                //   0.5 * (cognusScene[this.arguments.targetY] - mesh.rotation.x);
                // mesh.position.z +=
                //   0.5 * (cognusScene[this.arguments.targetY] - mesh.rotation.x);

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
