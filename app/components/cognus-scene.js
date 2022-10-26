import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { Scene } from 'three';

export default class CognusSceneComponent extends Component {
  @service cognusScene;

  @action
  didInsert($el) {
    const scene = new Scene(
      this.background,
      this.environment,
      this.fog,
      this.isScene,
      this.overrideMaterial
    );
    this.cognusScene.addComponent({
      type: 'scenes',
      object: scene,
    });

    this.cognusScene.addComponent({
      type: 'canvas',
      object: $el,
    });

    this.cognusScene.boot();
    setTimeout(() => {
      console.log(this.cognusScene);
    }, 1000);
  }

  get background() {
    return this.args.background || null;
  }
  get environment() {
    return this.args.environment || null;
  }
  get fog() {
    return this.args.fog || null;
  }
  get isScene() {
    return this.args.isScene || null;
  }
  get overrideMaterial() {
    return this.args.overrideMaterial || null;
  }
}
