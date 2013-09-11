angular.module('app.upload', [
  'app.config',
  'blueimp.fileupload'
])
.config([
  '$httpProvider', 'fileUploadProvider',
  function ($httpProvider, fileUploadProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    fileUploadProvider.defaults.redirect = window.location.href.replace(
    /\/[^\/]*$/,
    '/cors/result.html?%s'
    );
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

.controller('DemoFileUploadController', [
  '$scope', '$http', 'uploadurl',
  function ($scope, $http, uploadurl) {
    $scope.options = {
      url: uploadurl
    };
    $scope.loadingFiles = true;
    $http.get(uploadurl)
    .then(
    function (response) {
      $scope.loadingFiles = false;
      $scope.queue = response.data.files || [];
    },
    function () {
      $scope.loadingFiles = false;
    }
    );
  }
])

.controller('FileDestroyController', [
  '$scope', '$http',
  function ($scope, $http) {
    var file = $scope.file,
    state;
    if (file.url) {
      file.$state = function () {
        return state;
      };
      file.$destroy = function () {
        state = 'pending';
        return $http({
          url: file.deleteUrl,
          method: file.deleteType
        }).then(
        function () {
          state = 'resolved';
          $scope.clear(file);
        },
        function () {
          state = 'rejected';
        }
        );
      };
    } else if (!file.$cancel && !file._index) {
      file.$cancel = function () {
        $scope.clear(file);
      };
    }
  }
]);