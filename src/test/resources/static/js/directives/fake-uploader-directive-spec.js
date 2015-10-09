//describe('Directive: fake-uploader', function() {
//                 var element, scope;
//
//                 beforeEach(module('registro-livre'));
//
//                 beforeEach(inject(function($rootScope, $compile) {
//                      element = angular.element(
//                      '<input name="companyFile" type="file" id="files" class="hidden" fake-file-uploader eva-model="evaData" />'
//                      );
//                     scope = $rootScope;
//                     scope.evaData = {};
//                     $compile(element)(scope);
//                     scope.$digest();
//                 }));
//
//                 it("Should simulate a file upload when given a pdf in its size limits", function() {
//                     var files = [];
//                     var file = {
//                         size: '0',
//                         type: 'application/pdf',
//                         name: 'dummy'
//                     };
//                     files.push(file);
//                     scope.evaData.files = files;
//                     scope.$digest();
//                     element.triggerHandler('change');
//                     file.completed.should.be.true;
//                 });
//             });