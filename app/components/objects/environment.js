import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EquirectangularReflectionMapping } from 'three';

// import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment'
export default class ObjectsEnvironmentComponent extends Component {
  @service cognusScene;

  @action
  didInsert() {
    const cognusScene = this.cognusScene;
    new RGBELoader().load('/textures/museum.hdr', function (texture) {
      texture.mapping = EquirectangularReflectionMapping;
      cognusScene.scene.environment = texture;
    });
  }
}
