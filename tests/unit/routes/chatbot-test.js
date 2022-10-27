import { module, test } from 'qunit';
import { setupTest } from 'bluedarwin-the-movie/tests/helpers';

module('Unit | Route | chatbot', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:chatbot');
    assert.ok(route);
  });
});
