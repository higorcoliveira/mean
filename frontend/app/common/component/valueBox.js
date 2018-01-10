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
    template: `
      <div class="{{ $ctrl.gridClasses }}">
          <div class="small-box {{ $ctrl.colorClass }}">
            <div class="inner">
              <h3>{{ $ctrl.value }}</h3>
              <p>{{ $ctrl.label }}</p>
            </div>
            <div class="icon">
              <i class="fa {{ $ctrl.iconClass }}"></i>
            </div>
          </div>
      </div>
    `
  })
})()
