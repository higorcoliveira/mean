angular.module('primeiraApp').constant('consts', {
  appName: 'MEAN - Primeira Aplicação',
  version: '1.0',
  owner: 'Higor',
  year: '2018',
  site: '',
  apiUrl: 'http://localhost:3003/api',
  oapiUrl: 'http://localhost:3003/oapi',
  userKey: '_key_auth'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
