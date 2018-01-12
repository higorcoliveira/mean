/**
Componente responsável pela paginação
**/
(function() {
  angular.module('primeiraApp').component('pagination', {
    bindings: {
      url: '@',
      pages: '@'
    },
    controller: [
      '$location',
      function($location) {
        this.$onInit = () => {
          const pages = parseInt(this.pages) || 1
          // calcula o array de páginas da navegação
          this.pagesArray = Array(pages).fill(0).map((e, i) => i + 1)

          this.current = parseInt($location.search().page) || 1
          this.needPagination = this.pages > 1
          this.hasPrev = this.current > 1
          this.hasNext = this.current < this.pages

          this.isCurrent = i => {
            return this.current == i
          }
        }
      }
    ],
    templateUrl: 'common/component/template/pagination.html'
  })
})()
