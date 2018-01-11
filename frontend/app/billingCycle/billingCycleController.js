(function () {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http', 'msgs', 'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = () => {
      $http.get(url).then(response => {
        vm.billingCycle = {}
        vm.billingCycles = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }

    vm.create = () => {
      $http.post(url, vm.billingCycle).then(response => {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(response => {
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = billingCycle => {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabUpdate: true})
    }

    vm.showTabDelete = billingCycle => {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabDelete: true})
    }

    // chamando a função que lista as entidades billingCycle no momento do carregamento
    vm.refresh()
  }
})()
