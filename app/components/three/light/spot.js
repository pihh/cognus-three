import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { SpotLight, SpotLightHelper, CameraHelper } from 'three';

export default class ThreeLightSpotComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    // color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1
    const light = new SpotLight(
      this.color,
      this.intensity,
      this.distance,
      this.angle,
      this.penumbra,
      this.decay
    );

    light.position.x = this.position.x;
    light.position.y = this.position.y;
    light.position.z = this.position.z;

    light.castShadow = this.castShadow;

    light.shadow.focus = 10; // default
    // light.shadow.scale = 10; // default
    // light.shadow.blur = 1.5; // default
    // light.shadow.camera.far = 0.8; // default
    // light.shadow.focus = 1; // default
    console.log(light);

    this.cognusScene.addComponent({
      type: 'lights',
      object: light,
      color: this.color,
      helper() {
        return new SpotLightHelper(light, 2);
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

  get angle() {
    return this.args.angle || Math.PI / 3;
  }
  get penumbra() {
    return 0;
  }

  get decay() {
    return this.args.decay || 1;
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
