import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { AmbientLight, AmbientLightHelper } from 'three';

export default class ThreeLightAmbientComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    const ambientLight = new AmbientLight(this.color, this.intensity);

    ambientLight.position.x = this.position.x;
    ambientLight.position.y = this.position.y;
    ambientLight.position.z = this.position.z;

    this.cognusScene.addComponent({
      type: 'lights',
      object: ambientLight,
      color: this.color,
      helper() {
        return new AmbientLightHelper(ambientLight, 2);
      },
    });
  }

  get color() {
    return this.args.color || 0xffffff;
  }

  get intensity() {
    return this.args.intensity || 1;
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
