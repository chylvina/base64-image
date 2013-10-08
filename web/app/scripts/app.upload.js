angular.module('app.upload', [
    'app.config',
    'blueimp.fileupload'
  ])
  .config([
    '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      angular.extend(fileUploadProvider.defaults, {
        'autoUpload': true,
        limitMultiFileUploads: 1,
        limitConcurrentUploads: 1,
        disableImageResize: true,
        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
      });
    }
  ])

  .controller('AppFileUploadController', [
    '$scope', '$http', 'uploadurl',
    function ($scope, $http, uploadurl) {
      $scope.options = {
        url: uploadurl
      };
      $scope.loadingFiles = false;
    }
  ]);