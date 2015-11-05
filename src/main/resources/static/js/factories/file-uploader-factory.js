app.factory('fileUploaderFactory', ['$http', function($http) {
  function setFileUploaderOptions($scope, $document) {
    $scope.evaData = {
      // this variable is used like a model for particular directive
      // all parameters here are optional
      fileButton: $document.find('#btnFile'),
      filesInput: $document.find('#files'),
      progressBar: $document.find('#progressBar > div'),
      // every file will get the following link on s3:
      // http://<your_bucket>.s3.amazonaws.com/<this_value>/<upload_datetime>$<filename_with_extension>
      // if you want to put the files into nested folder, just use dir: 'path/to/your/folder'
      // if not specified, default value being used is: '' (matches bucket's root directory)
      dir: 'tmp',

      // You can pick a different separator string that goes in between upload_datetime and filename_with_extension:
      // http://<your_bucket>.s3.amazonaws.com/<dir>/<upload_datetime><this_value><filename_with_extension>
      // if not specified, the default value being used is: '$'
      timestampSeparator: '_',

      // headers which should (headersSigned) and should not (headersCommon) be signed by your private key
      // for details, visit http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html
      headersCommon: {
        'Cache-Control': 'max-age=3600'
      },
      headersSigned: {
        'x-amz-acl': 'public-read'
      },

      maxSizeMB: 5,

      clearFiles: function () {
        $scope.evaData.files = [];
        $scope.evaData.animateProgressBar(0, 0);
        $scope.evaData.enableFileUpload();
      },

      enableFileUpload: function () {
        $scope.evaData.filesInput.prop('disabled', false);
        $scope.evaData.fileButton.text('Selecionar arquivo');
      },

      disableFileUpload: function () {
        $scope.evaData.filesInput.prop('disabled', true);
        $scope.evaData.fileButton.text('Uploading...');
      },

      animateProgressBar: function (width, progress) {
        $scope.evaData.progressBar.animate({ width: width }, 500).html(progress + '%');
      },

      // custom callbacks for onProgress and onComplete events
      onFileStart: function () {
        $scope.evaData.progressBar.width(0).html('');
        $scope.evaData.disableFileUpload();
      },

      onFileProgress: function (file) {
        var progressBarWidth = file.progress * $('#progressBar').width() / 100;
        $scope.evaData.animateProgressBar(progressBarWidth, file.progress);
      },

      onFileComplete: function () {
        $scope.evaData.animateProgressBar($('#progressBar').width(), 100);
        $scope.evaData.enableFileUpload();
      },

      onFileError: function (file, message) {
        $scope.evaData.enableFileUpload();
      }
    };
  }

  function createFileUploader(onSuccess) {
      return $http.get('/get-file-uploader-options').then(function(response) {
        var evaporateOptions = {
           awsUrl:   'https://s3-' + response.data.awsRegion + '.amazonaws.com',
           signerUrl: response.data.signerUrl,
           awsKey:   response.data.awsKey,
           bucket:    response.data.bucket,
           region:    response.data.awsRegion,
           logging:   true
        };
        onSuccess(evaporateOptions);
      });
    }
  return {
    setFileUploaderOptions: setFileUploaderOptions,
    createFileUploader: createFileUploader
  };
}]);