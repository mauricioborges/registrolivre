exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*.js'],
  capabilities:
  {
      'browserName': 'chrome'
  },
  params: {
      cnpj: "73.193.236/0001-65",
      cnpj2: "74.174.834/0001-50",
      name: "Boteco do Pedro",
      name2: "Company without partner Chrome",
      partnerName:"Sócio",
      cpf:"442.282.005-24"
  }
};