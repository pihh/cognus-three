import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  pointLightPosition = {
    x: 2,
    y: 3,
    z: 4,
  };

  pointLightPosition2 = {
    x: 1,
    y: 1,
    z: 1,
  };

  pointLightPosition3 = {
    x: -2,
    y: 1,
    z: -2,
  };

  pointLightColor2 = 0xff0000;

  cameraPosition = {
    x: 0,
    y: 0,
    z: 2,
  };
}
