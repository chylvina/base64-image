angular.module("app.config",[]).constant("uploadurl","http://localhost/upload"),angular.module("app.upload",["app.config","blueimp.fileupload"]).config(["$httpProvider","fileUploadProvider",function(a,b){delete a.defaults.headers.common["X-Requested-With"],angular.extend(b.defaults,{autoUpload:!1,limitMultiFileUploads:1,limitConcurrentUploads:1,disableImageResize:!0,maxFileSize:5e6,acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i})}]).controller("AppFileUploadController",function(a,b,c){a.options={url:c},a.loadingFiles=!1,a.readytoUpload=!1,a.canCancel=!1,a.resultArr=[],a.$on("fileuploadadd",function(){a.readytoUpload=!0}),a.$on("fileuploadstart",function(){a.readytoUpload=!1,a.canCancel=!0}),a.$on("fileuploaddone",function(b,c){a.canCancel=!1,c.result&&a.resultArr.unshift(c.result),a.queue=[]}),a.$on("fileuploadfail",function(){a.canCancel=!1,a.queue=[]})}),angular.module("app.directive",[]).directive("selectOnClick",function(){return function(a,b){b.click(function(){b.select()})}}),angular.module("app",["ui.router","app.upload","app.directive","ngAnimate"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.when("/c?id","/contacts/:id").when("/user/:id","/contacts/:id").otherwise("/"),a.state("home",{url:"/",templateUrl:"views/main.html",controller:function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}}).state("step2",{"abstract":!0,url:"/done",templateUrl:"views/step2.html",resolve:{contacts:["contacts",function(a){return a.all()}]},controller:function(a,b,c,d){a.contacts=c,a.goToRandom=function(){var c=d.newRandomKey(a.contacts,"id",b.params.contactId);b.go("contacts.detail",{contactId:c})}}})}]).run(["$rootScope","$state","$stateParams",function(a,b,c){a.$state=b,a.$stateParams=c}]);