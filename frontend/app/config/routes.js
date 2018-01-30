(function() {
  angular.module('primeiraApp').config([
      '$stateProvider',
      '$urlRouterProvider',
      '$httpProvider',
      function($stateProvider, $urlRouterProvider, $httpProvider) {
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

          $httpProvider.interceptors.push('handleResponseError')
      }
  ])
  .run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function ($rootScope, $http, $location, $window, auth) {
      validateUser()
      // cada mudança de url o token é validado
      $rootScope.$on('$locationChangeStart', () => validateUser())

      function validateUser() {
        const user = auth.getUser()
        const authPage = '/auth.html'
        const isAuthPage = $window.location.href.includes(authPage)

        // usuário não existe e não estou na página de autenticação, tem que logar...
        if (!user && !isAuthPage) {
          $window.location.href = authPage
        } else if (user && !user.isValid) {
          // valida o token, caso o mesmo esteja expirado desloga da aplicação
          auth.validateToken(user.token, (err, valid) => {
            if (!valid) {
              $window.location.href = authPage
            } else {
              user.isValid = true
              $http.defaults.headers.common.Authorization = user.token
              isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
            }
          })
        }
      }
    }
  ])
})()
