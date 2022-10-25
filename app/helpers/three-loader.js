import { helper } from '@ember/component/helper';

export default helper(function threeLoader(positional /*, named*/) {
  positional[0]();
  return '';
});
