(function () {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http', '$location', 'msgs', 'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, $location, msgs, tabs) {
    const vm = this
    // TODO extrair para constantes
    const url = 'http://localhost:3003/api/billingCycles'
    const pageSize = 10

    vm.refresh = () => {
      const page = parseInt($location.search().page) || 1

      $http.get(`${url}?skip=${(page - 1) * pageSize}&limit=10`).then(response => {
        vm.billingCycle = {credits: [{}], debts: [{}]}
        vm.billingCycles = response.data
        vm.calculateValues()

        // contagem para fazer a paginação
        $http.get(`${url}/count`).then(response => {
          vm.pages = Math.ceil(response.data.value / pageSize)
          tabs.show(vm, {tabList: true, tabCreate: true})
        })
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
      if (vm.billingCycle.credits.length === 0) {
          vm.billingCycle.credits = [{}]
      }
      if (vm.billingCycle.debts.length === 0) {
          vm.billingCycle.debts = [{}]
      }
      vm.calculateValues()
      tabs.show(vm, {tabUpdate: true})
    }

    vm.showTabDelete = billingCycle => {
      vm.billingCycle = billingCycle
      vm.calculateValues()
      tabs.show(vm, {tabDelete: true})
    }

    vm.delete = () => {
      const deleteUrl = `${url}/${vm.billingCycle._id}`
      $http.delete(deleteUrl, vm.billingCycle).then(response => {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(response => {
        msgs.addError(response.data.errors)
      })
    }

    vm.update = () => {
      const updateUrl = `${url}/${vm.billingCycle._id}`
      $http.put(updateUrl, vm.billingCycle).then(response => {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(response => {
        msgs.addError(response.data.errors)
      })
    }

    // parte de créditos
    vm.addCredit = index => {
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    vm.cloneCredit = (index, {name, value}) => {
      vm.billingCycle.credits.splice(index + 1, 0, {name, value})
      vm.calculateValues()
    }

    vm.removeCredit = index => {
      if (vm.billingCycle.credits.length > 1) {
        vm.billingCycle.credits.splice(index, 1)
        vm.calculateValues()
      }
    }

    // parte de débitos
    vm.addDebt = index => {
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

    vm.cloneDebt = (index, {name, value, status}) => {
      vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
      vm.calculateValues()
    }

    vm.removeDebt = index => {
      if (vm.billingCycle.debts.length > 1) {
        vm.billingCycle.debts.splice(index, 1)
        vm.calculateValues()
      }
    }

    // calcula o sumário de ciclo de pagamento
    vm.calculateValues = () => {
      vm.credit = 0
      vm.debt = 0

      if (vm.billingCycle) {
        vm.billingCycle.credits.forEach(({value}) => {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })

        vm.billingCycle.debts.forEach(({value}) => {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })

        vm.total = vm.credit - vm.debt
      }
    }

    // chamando a função que lista as entidades billingCycle no momento do carregamento
    vm.refresh()
  }
})()
