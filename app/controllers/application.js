import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
export default class ApplicationController extends Controller {
  @tracked splash = true;
  cameraPosition = {
    x: 0,
    y: 0,
    z: 4,
  };

  spotLightPosition = {
    x: 19,
    y: 15,
    z: 10,
  };

  spotLight2Position = {
    x: -200,
    y: 31,
    z: 130,
  };

  minPolarAngle = Math.PI / 2;
  maxPolarAngle = Math.PI / 2;

  constructor() {
    super(...arguments);
    setTimeout(() => {
      document.querySelector('.splash').style.opacity = 0;
    }, 1500);
    setTimeout(() => {
      this.splash = false;
    }, 2500);
  }
}
