/**
Componente de input de dados
**/
(function() {
  angular.module('primeiraApp').component('field', {
    bindings: {
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type: '@',
      model: '=',
      readonly: '<'
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
          this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    templateUrl: 'common/component/template/field.html'
  })
})()
