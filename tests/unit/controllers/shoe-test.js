import { module, test } from 'qunit';
import { setupTest } from 'bluedarwin-the-movie/tests/helpers';

module('Unit | Controller | shoe', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:shoe');
    assert.ok(controller);
  });
});
