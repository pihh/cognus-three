import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { SphereGeometry, MeshStandardMaterial, Color, Mesh } from 'three';
import { normalTexture } from '../../utils/three-textures';

export default class ObjectsSphereComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    // Objects
    const geometry = new SphereGeometry(0.5, 64, 64);

    // Materials

    const material = new MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.color = new Color(0xffffff);

    normalTexture('NormalMap.png', material);

    // Mesh
    const sphere = new Mesh(geometry, material);
    const cognusScene = this.cognusScene;

    this.cognusScene.addComponent({
      type: 'objects',
      object: sphere,
      arguments: [],
      init() {
        cognusScene.targetX = 0;
        cognusScene.targetY = 0;
        this.arguments.push({ targetX: cognusScene.targetX });
        this.arguments.push({ targetY: cognusScene.targetY });
      },
      render() {
        cognusScene.targetX = cognusScene.mouseX * 0.001;
        sphere.rotation.y = 0.5 * cognusScene.elapsedTime;
        sphere.rotation.y += 0.5 * (cognusScene.targetX - sphere.rotation.y);
        sphere.rotation.x += 0.5 * (cognusScene.targetY - sphere.rotation.x);
        sphere.position.z += 0.5 * (cognusScene.targetY - sphere.rotation.x);
      },
      scroll(e) {
        // console.log(e);
        sphere.position.y = window.scrollY * 0.001;
      },
    });
  }
}
