exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*.js'],
  capabilities:
  {
      'browserName': 'firefox'
  },
  params: {
    cnpj: "52.504.473/0001-20",
    name: "ZYGama Company LTDA2"
  }
};