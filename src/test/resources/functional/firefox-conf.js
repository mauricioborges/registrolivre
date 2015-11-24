exports.config = {
      seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['**/*.js'],
    capabilities:
    {
        'browserName': 'firefox'
    },
    baseUrl: 'http://localhost:5000/',
    params: {
        validCNPJ: '52.504.473/0001-20',
        anotherValidCNPJ: '32.533.430/0001-65',
        invalidCNPJ: '00.000.000/0000-00',
        incompleteCNPJ: '00.000.000',
        validCompanyName: 'ZYGama Company LTDA2',
        anotherValidCompanyName: 'Company without partner Firefox',
        validPartnerName: 'Sócio',
        validCPF: '442.282.005-24',
        invalidCPF: '000.000.000-00',
        invalidDate: '21/13/2009'
    }
};
