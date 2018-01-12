(function() {
  angular.module('primeiraApp').config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
          $stateProvider.state('dashboard', {
              url: "/dashboard",
              templateUrl: "dashboard/dashboard.html",
              controller: "DashboardCtrl as dashboard"
          })
          .state('billingCycle', {
              url: "/billingCycles?page",
              templateUrl: "billingCycle/tabs.html",
              controller: "BillingCycleCtrl as bcCtrl"
          })

          $urlRouterProvider.otherwise('/dashboard')
      }
  ])
})()
