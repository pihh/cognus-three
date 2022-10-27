import { module, test } from 'qunit';
import { setupRenderingTest } from 'bluedarwin-the-movie/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | three/contact-shadows', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Three::ContactShadows />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Three::ContactShadows>
        template block text
      </Three::ContactShadows>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
