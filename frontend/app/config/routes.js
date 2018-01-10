(function() {
  angular.module('primeiraApp').config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
          $stateProvider.state('dashboard', {
              url: "/dashboard",
              templateUrl: "dashboard/dashboard.html",
              controller: "DashboardCtrl as dashboard"
          }).state('billingCycle', {
              url: "/billingCycle",
              templateUrl: "billingCycle/tabs.html"
          })

          $urlRouterProvider.otherwise('/dashboard')
      }
  ])
})()
