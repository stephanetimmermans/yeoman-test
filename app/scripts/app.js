'use strict';

var yeomanTestApp = angular.module('yeomanTestApp', [
  'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.sortable', 'LocalStorageModule'
]);

yeomanTestApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }]);

yeomanTestApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
  })
   .otherwise({
      redirectTo: '/'
  });
});

yeomanTestApp.controller('MainController', ['localStorageService', function (localStorageService) {

    var todosInStore = localStorageService.get('todos');
    var service = localStorageService;

    this.todos = todosInStore && todosInStore.split(';') || [];
    this.todo = '';

    this.addTodo = function () {
        this.todos.push(this.todo);
        localStorageService.add('todos', this.todos.join(';'))
        this.todo = '';
    };

    this.removeTodo = function (todo) {
        this.todos.pop(todo);
        localStorageService.add('todos', this.todos.join(';'))
    };

}]);

