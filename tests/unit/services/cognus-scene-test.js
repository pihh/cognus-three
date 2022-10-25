import { module, test } from 'qunit';
import { setupTest } from 'bluedarwin-the-movie/tests/helpers';

module('Unit | Service | cognus-scene', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:cognus-scene');
    assert.ok(service);
  });
});
