import { module, test } from 'qunit';
import { setupTest } from 'bluedarwin-the-movie/tests/helpers';

module('Unit | Controller | chatbot', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:chatbot');
    assert.ok(controller);
  });
});
