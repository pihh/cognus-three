import { module, test } from 'qunit';
import { setupRenderingTest } from 'bluedarwin-the-movie/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | three/light/point', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Three::Light::Point />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Three::Light::Point>
        template block text
      </Three::Light::Point>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
