'use strict';

angular.module('aymApp', ['aymApp.contact'])
.config(function ($stateProvider, $urlRouterProvider) {

  /////////////////////////////
  // Redirects and Otherwise //
  /////////////////////////////

  // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
  $urlRouterProvider

    // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
    // Here we are just setting up some convenience urls.
  .when('/c?id', '/contacts/:id')
  .when('/user/:id', '/contacts/:id')

    // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
  .otherwise('/');


  //////////////////////////
  // State Configurations //
  //////////////////////////

  // Use $stateProvider to configure your states.
  $stateProvider

  .state("home", {

    // Use a url of "/" to set a states as the "index".
    url: "/",

    // Example of an inline template string. By default, templates
    // will populate the ui-view within the parent state's template.
    // For top level states, like this one, the parent template is
    // the index.html file. So this template will be inserted into the
    // ui-view within index.html.
    templateUrl: 'views/main.html',

    controller: function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

  })
}).
run(function ($rootScope, $state, $stateParams) {
  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
