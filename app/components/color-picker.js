import Component from '@glimmer/component';
import 'vanilla-colorful';
import { action } from '@ember/object';

export default class ColorPickerComponent extends Component {
  @action
  didInsert($el) {
    $el.addEventListener('color-changed', (event) => {
      // get updated color value
      const newColor = event.detail.value;
      if (this.args.onColorChange) {
        this.args.onColorChange(newColor);
      }
    });
  }

  get title() {
    return this.args.current ? this.args.current.name : '';
  }

  get color() {
    return this.args.current
      ? '#' + this.args.current.color.getHexString()
      : '#FFFFFF';
  }

  get current() {
    return this.args.current || false;
  }
}
