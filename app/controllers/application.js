import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
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
    x: 19,
    y: 100,
    z: 10,
  };

  minPolarAngle = Math.PI / 2;
  maxPolarAngle = Math.PI / 2;
}
