/**
Componente que imprime as boxes que contém os valores do Dashboard
**/
(function() {
  angular.module('primeiraApp').component('valueBox', {
    bindings: {
      grid: '@',
      colorClass: '@',
      value: '@',
      label: '@',
      iconClass: '@'
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
        // utilizando método de ciclo de vida do angular para que seja feito o bind
        // corretamente da variável grid
        this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    templateUrl: 'common/component/template/valueBox.html'    
  })
})()
