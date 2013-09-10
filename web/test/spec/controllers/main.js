'use strict';

describe("aymApp", function () {

  beforeEach(module('aymApp'));

  describe("MoviesController", function () {

    var scope, httpBackend;
    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      httpBackend.when("GET", "views/contact/test/contacts.json").respond([{}, {}, {}]);
      $controller('MoviesController', {
        $scope: scope,
        $http: $http
      });
    }));

    it("should have 3 movies", function () {
      httpBackend.flush();
      expect(scope.movies.length).toBe(3);
    });
  });
});
