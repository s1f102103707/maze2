module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'order/properties-order': [
      // 指定したプロパティの順序に従ってカスタマイズ
      'display',
      'flex-direction',
      'padding',
      'background-color',
      'margin',
      'border',
      'text-align',
      'width',
    ],
  },
};
