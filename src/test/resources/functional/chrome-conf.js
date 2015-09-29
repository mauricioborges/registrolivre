exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*.js'],
  capabilities:
  {
      'browserName': 'chrome'
  },
  params: {
      cnpj: "73.193.236/0001-65",
      name: "Boteco do Pedro"
  }
};