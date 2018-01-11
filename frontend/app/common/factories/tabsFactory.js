/**
Factory que controla exibição das abas do menu de Cliclo de Pagamentos
**/
(function() {
  angular.module('primeiraApp').factory('tabs', [ TabsFactory ])

  function TabsFactory() {

    function show(owner, {
        tabList = false,
        tabCreate = false,
        tabUpdate = false,
        tabDelete = false
    }) {
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
    }

    return { show }
  }
})()
