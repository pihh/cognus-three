import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DirectionalLight, DirectionalLightHelper } from 'three';

export default class ThreeLightDirectionalComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    const light = new DirectionalLight(this.color, this.intensity);

    light.position.x = this.position.x;
    light.position.y = this.position.y;
    light.position.z = this.position.z;

    light.castShadow = this.castShadow;

    this.cognusScene.addComponent({
      type: 'lights',
      object: light,
      color: this.color,
      helper() {
        return new DirectionalLightHelper(light, 5);
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

  get castShadow() {
    return this.args.castShadow == false ? false : true;
  }
}
