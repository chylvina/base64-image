'use strict';

angular.module('app', ['ui.router', 'app.upload'])
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

  .state("step1", {

    // Use a url of "/" to set a states as the "index".
    url: "/",

    templateUrl: 'views/step1.html',

    controller: function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }

  })
  .state('step2', {

    // With abstract set to true, that means this state can not be explicitly activated.
    // It can only be implicitly activated by activating one if it's children.
    abstract: true,

    // This abstract state will prepend '/contacts' onto the urls of all its children.
    url: '/done',

    // Example of loading a template from a file. This is also a top level state,
    // so this template file will be loaded and then inserted into the ui-view
    // within index.html.
    templateUrl: 'views/step2.html',

    // Use `resolve` to resolve any asynchronous controller dependencies
    // *before* the controller is instantiated. In this case, since contacts
    // returns a promise, the controller will wait until contacts.all() is
    // resolved before instantiation. Non-promise return values are considered
    // to be resolved immediately.
    resolve: {
      contacts: ['contacts',
        function (contacts) {
          return contacts.all();
        }]
    },

    // You can pair a controller to your template. There *must* be a template to pair with.
    controller: function ($scope, $state, contacts, utils) {

      // Add a 'contacts' field in this abstract parent's scope, so that all
      // child state views can access it in their scopes. Please note: scope
      // inheritance is not due to nesting of states, but rather choosing to
      // nest the templates of those states. It's normal scope inheritance.
      $scope.contacts = contacts;

      $scope.goToRandom = function () {
        var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

        // $state.go() can be used as a high level convenience method
        // for activating a state programmatically.
        $state.go('contacts.detail', { contactId: randId });
      };
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
