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
    const cognusScene = this.cognusScene;
    const ground = new Mesh(
      new PlaneBufferGeometry(8, 8),
      new MeshPhongMaterial({ color: this.color, depthWrite: false })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = this.recieveShadow;
    ground.castShadow = this.castShadow;
    ground.transparent = true;
    ground.position.y = -0.8;

    this.cognusScene.addComponent({
      type: 'objects',
      object: ground,
      render(obj) {
        // sphere.rotation.y = 0.5 * scene.elapsedTime;
      },
      init() {
        cognusScene.pubsub.publish('object-initialized', this.object);
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
