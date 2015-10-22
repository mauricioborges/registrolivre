exports.config = {
  directConnect: true,
  specs: ['**/*.js'],
  capabilities:
  {
      'browserName': 'firefox'
  },
  params: {
    cnpj: "52.504.473/0001-20",
    cnpj2: "32.533.430/0001-65",
    name: "ZYGama Company LTDA2",
    name2: "Company without partner Firefox",
    partnerName:"Sócio",
    cpf:"442.282.005-24"
  }
};
