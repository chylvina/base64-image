"use strict";

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

  .controller('AppFileUploadController', function ($scope, $http, $translate, uploadurl) {
    $scope.options = {
      url: uploadurl
    };
    $scope.loadingFiles = false;
    $scope.readytoUpload = false;
    $scope.canCancel = false;

    $scope.resultArr = [];

    $scope.$on('fileuploadadd', function(event, data) {
      if(!data || !data.files || !data.files[0]) {
        window.alert($translate('ALERT1'));
        event.targetScope.queue = [];
        return;
      }

      if(!/\.(gif|jpe?g|png)$/i.test(data.files[0].name)) {
        window.alert($translate('ALERT2'));
        event.targetScope.queue = [];
        return;
      }

      if(data.files[0].size > 2 * 1024 * 1024) {
        window.alert($translate('ALERT3'));
        event.targetScope.queue = [];
        return;
      }

      $scope.readytoUpload = true;
    });
    $scope.$on('fileuploadstart', function(event, data) {
      $scope.readytoUpload = false;
      $scope.canCancel = true;
    });
    $scope.$on('fileuploaddone', function(event, data) {
      $scope.canCancel = false;
      if(data.result) {
        $scope.resultArr.unshift(data.result);
      }
      event.targetScope.queue = [];
    });
    $scope.$on('fileuploadfail', function(event, data) {
      $scope.canCancel = false;
      event.targetScope.queue = [];
    });
  });