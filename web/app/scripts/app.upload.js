angular.module('app.upload', [
    'app.config',
    'blueimp.fileupload'
  ])
  .config([
    '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      angular.extend(fileUploadProvider.defaults, {
        'autoUpload': false,
        limitMultiFileUploads: 1,
        limitConcurrentUploads: 1,
        disableImageResize: true,
        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
      });
    }
  ])

  .controller('AppFileUploadController', function ($scope, $http, uploadurl) {
    $scope.options = {
      url: uploadurl
    };
    $scope.loadingFiles = false;
  });