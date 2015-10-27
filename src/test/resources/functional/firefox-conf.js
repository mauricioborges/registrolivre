exports.config = {
  directConnect: true,
  specs: ['**/*.js'],
  capabilities:
  {
      'browserName': 'firefox'
  },
  params: {
    validCNPJ: "52.504.473/0001-20",
    otherValidCNPJ: "32.533.430/0001-65",
    cnpjInvalid: "00.000.000/0000-00",
    cnpjIncomplete: "00.000.000",
    validCompanyName: "ZYGama Company LTDA2",
    otherValidCompanyName: "Company without partner Firefox",
    validPartnerName:"Sócio",
    validCPF:"442.282.005-24",
    invalidCPF:"000.000.000-00"
  }
};
