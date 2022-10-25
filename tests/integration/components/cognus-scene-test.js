import { module, test } from 'qunit';
import { setupRenderingTest } from 'bluedarwin-the-movie/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | cognus-scene', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CognusScene />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <CognusScene>
        template block text
      </CognusScene>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
