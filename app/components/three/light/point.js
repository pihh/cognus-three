import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PointLight, PointLightHelper } from 'three';

export default class ThreeLightPointComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    const pointLight = new PointLight(
      this.color,
      this.intensity,
      this.distance,
      this.decay
    );

    pointLight.position.x = this.position.x;
    pointLight.position.y = this.position.y;
    pointLight.position.z = this.position.z;

    this.cognusScene.addComponent({
      type: 'lights',
      object: pointLight,
      color: this.color,
      helper() {
        return new PointLightHelper(pointLight, 2);
      },
    });
  }

  get color() {
    return this.args.color || 0xffffff;
  }

  get intensity() {
    return this.args.intensity || 1;
  }
  get distance() {
    return this.args.distance || 0;
  }

  get decay() {
    return this.args.decay || 2;
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
