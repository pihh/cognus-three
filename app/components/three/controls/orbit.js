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
        orbitControls.minPolarAngle = self.minPolarAngle;
        orbitControls.maxPolarAngle = self.maxPolarAngle;
        orbitControls.enableZoom = self.enableZoom;
        orbitControls.enablePan = self.enablePan;
        this.object = orbitControls;
        console.log(this.object);
      },
    });
  }

  get enableDamping() {
    return this.args.enableDamping == false ? false : true;
  }
  get minPolarAngle() {
    return this.args.minPolarAngle || 0;
  }
  get maxPolarAngle() {
    return this.args.maxPolarAngle || Math.PI;
  }
  get enableZoom() {
    return this.args.enableZoom == false ? false : true;
  }
  get enablePan() {
    console.log(this.args.enablePan);
    return this.args.enablePan == false ? false : true;
  }
}

// minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false}
