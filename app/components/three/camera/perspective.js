import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PerspectiveCamera } from 'three';
export default class ThreeCameraPerspectiveComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    const perspectiveCamera = new PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );

    perspectiveCamera.position.x = this.position.x;
    perspectiveCamera.position.y = this.position.y;
    perspectiveCamera.position.z = this.position.z;

    this.cognusScene.addComponent({
      type: 'cameras',
      object: perspectiveCamera,
    });
  }

  get fov() {
    return this.args.fov || 50;
  }

  get aspect() {
    return (
      this.args.aspect ||
      this.cognusScene.sizes.width / this.cognusScene.sizes.height
    );
  }

  get near() {
    return this.args.near || 0.1;
  }

  get far() {
    return this.args.far || 2000;
  }

  get position() {
    const position = {
      x: 0,
      y: 0,
      z: 0,
    };
    const _position = this.args.position || {};
    try {
      return {
        ...position,
        ..._position,
      };
    } catch (ex) {
      return position;
    }
  }
}
