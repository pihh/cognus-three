import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class ThreeControlsOrbitComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    let orbitControls = {};
    let self = this;

    this.cognusScene.addComponent({
      type: 'controls',
      object: orbitControls,
      render(elapsedTime) {
        // this.object.update();
      },
      init(camera, domElement) {
        orbitControls = new OrbitControls(camera, domElement);
        orbitControls.enableDamping = self.enableDamping;
        this.object = orbitControls;
      },
    });
  }

  get enableDamping() {
    return this.args.enableDamping || true;
  }
}
