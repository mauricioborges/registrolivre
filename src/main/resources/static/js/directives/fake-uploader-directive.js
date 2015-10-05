app.directive("fakeFileUploader", [function() {
    function link(scope, element) {
        if(!scope.data) scope.data = {};

        function emptyMethod() {};

        var data = scope.data,
            dir = data.dir ? (data.dir + '/') : '',
            maxSizeMB = data.maxSizeMB ? data.maxSizeMB  : 6,
            timestampSeparator = data.timestampSeparator || '$',
            headersCommon = data.headersCommon || {},
            headersSigned = data.headersSigned || {},
            onFileStart = (typeof data.onFileStart === 'function' ? data.onFileStart : emptyMethod),
            onFileProgress = (typeof data.onFileProgress === 'function' ? data.onFileProgress : emptyMethod),
            onFileComplete = (typeof data.onFileComplete === 'function' ? data.onFileComplete : emptyMethod),
            onFileError = (typeof data.onFileError === 'function' ? data.onFileError : emptyMethod);

        data.ready = false;
        
        element.bind('change', function (event) {
            console.log(event.target.files);
            data.files = [];
            angular.forEach(event.target.files, function (file) {
                data.fileMaxSizeLimitError = file.size > maxSizeMB * 1024 * 1024;
                if (data.fileMaxSizeLimitError) {
                    return;
                }
                data.fileTypeNotSupportedError = file.type != 'application/pdf';
                if (data.fileTypeNotSupportedError) {
                    return;
                }
                file.started = Date.now();
                file.path_ = dir + file.started + timestampSeparator + file.name;
                file.url = "http://ubimob2013.sciencesconf.org/21283/document";
                file.startingUpload = true;
                file.completed = true;
                onFileComplete(file);
                scope.$apply();
                data.files.push(file);
            });
            scope.$apply();
        });

        data.ready = true;
    }
    return {
        restrict: 'A',
        link: link,
        scope: {
            data: '=evaModel'
        }
    };
}]);
