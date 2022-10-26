import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PlaneBufferGeometry, MeshPhongMaterial, Color, Mesh } from 'three';

export default class ObjectsGroundComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    // Objects
    const ground = new Mesh(
      new PlaneBufferGeometry(8, 8),
      new MeshPhongMaterial({ color: this.color, depthWrite: false })
    );
    ground.rotation.x = -Math.PI / 2.1;
    ground.receiveShadow = this.recieveShadow;
    ground.castShadow = this.castShadow;
    ground.transparent = true;
    ground.position.y = -0.8;

    console.log({ ground });
    this.cognusScene.addComponent({
      type: 'objects',
      object: ground,
      render(obj) {
        // sphere.rotation.y = 0.5 * scene.elapsedTime;
      },
    });
  }

  get castShadow() {
    return this.args.castShadow || false;
  }

  get recieveShadow() {
    return this.args.recieveShadow || true;
  }

  get color() {
    return this.args.color || '#FFFFFF';
  }
}
