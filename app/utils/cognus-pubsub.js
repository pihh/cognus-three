import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

export default EmberObject.extend(Evented, {
  publish() {
    return this.trigger.apply(this, arguments);
  },
  subscribe() {
    return this.on.apply(this, arguments);
  },
  unsubscribe() {
    return this.off.apply(this, arguments);
  },
});
