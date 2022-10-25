import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { TorusGeometry, MeshBasicMaterial, Color, Mesh } from 'three';

export default class ObjectsBallComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    // Objects
    const geometry = new TorusGeometry(0.7, 0.2, 16, 100);

    // Materials

    const material = new MeshBasicMaterial();
    material.color = new Color(0xff0000);

    // Mesh
    const sphere = new Mesh(geometry, material);

    this.cognusScene.addComponent({
      type: 'objects',
      object: sphere,
      render: (scene) => {
        sphere.rotation.y = 0.5 * scene.elapsedTime;
      },
    });
  }
}
