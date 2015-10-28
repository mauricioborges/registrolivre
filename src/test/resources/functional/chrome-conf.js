exports.config = {
      seleniumAddress: 'http://localhost:4444/wd/hub',
      specs: ['**/*.js'],
      capabilities:
      {
          'browserName': 'chrome'
      },
      params: {
          validCNPJ: "73.193.236/0001-65",
          anotherCNPJ: "74.174.834/0001-50",
          companyName: "Boteco do Pedro",
          anotherCompanyName: "Company without partner Chrome",
          partnerName:"Sócio",
          cpf:"442.282.005-24"
      }
};