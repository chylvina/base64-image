"use strict";

angular.module('app.i18n', ['pascalprecht.translate'])
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      'TITLE': 'Base64 Image Encoder',
      'DESCRIPTION': 'Upload an image and convert it to base64 string format for usage in CSS, and HTML.',
      'ADD_FILE': 'Choose an image',
      'ENCODE': 'Encode',
      'CANCEL': 'Cancel',
      'RULE1': 'You can upload images of different formats (jpg, png, gif) with a maximum filesize of 2 MB.',
      'RULE2': 'Animated GIF is possible, too.',
      'LABEL1': 'Base64 String',
      'LABEL2': 'CSS Background Image',
      'LABEL3': 'Image Src',
      'ALERT1': 'Failed to load file.',
      'ALERT2': 'The file type is not supported.',
      'ALERT3': 'The file size is greater than 2MB.'
    });

    $translateProvider.translations('cn', {
      'TITLE': '图片Base64编码',
      'DESCRIPTION': '将本地图片进行Base64编码, 并应用到CSS和HTML中.',
      'ADD_FILE': '选择图片',
      'ENCODE': 'Base64编码',
      'CANCEL': '取消',
      'RULE1': '可以上传 jpg, png, gif 格式的图片, 文件大小不超过2M',
      'RULE2': '支持 gif 动画',
      'LABEL1': 'Base64 字符串',
      'LABEL2': 'CSS 背景图片',
      'LABEL3': 'Image Src',
      'ALERT1': '加载文件失败.',
      'ALERT2': '文件类型不被支持.',
      'ALERT3': '文件过大, 超过2MB.'
    });

    $translateProvider.preferredLanguage('en');
  })
  .run(function($window, $translate) {
    var lang = $window.navigator.userLanguage || $window.navigator.language;
    if(/cn/i.test(lang)) {
      $translate.uses('cn');
    }
  });
