describe("Factory: file-uploader-factory", function() {
    var fileUploaderFactory;

    beforeEach(module('registro-livre'));

    beforeEach(inject(function($injector) {
        fileUploaderFactory = $injector.get('fileUploaderFactory');
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("should get the configuration options for file uploader component.", function() {
        var expectedResponse = { awsRegion:'region', signerUrl:'signerUrl', awsKey:'awsKey', bucket:'bucket' };
        var expectedConfiguration = { awsUrl: 'https://s3-region.amazonaws.com', signerUrl: "signerUrl", awsKey: "awsKey", bucket: "bucket", region:"region", logging:true };
        $httpBackend.expectGET('/get-file-uploader-options').respond(expectedResponse);

        var onSuccess = function(result) {
            result.should.be.deep.equal(expectedConfiguration);
        };
        fileUploaderFactory.createFileUploader(onSuccess);
        $httpBackend.flush();
    });
});