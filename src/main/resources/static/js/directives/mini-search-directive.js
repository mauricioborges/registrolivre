app.directive('goSearch', function(companies) {
    return {
      template: ' <form ng-submit="searchCompanies()" ng-controller="SearchCompaniesController" class="form navbar-form navbar-right" id="search-form" role="search" name="search">'+
                                     '<div class="input-group">'+
                                     '    <input type="text"  style="padding: 0px 9px;font-size:12pt;margin: 10;"  ng-model="q" name="q" id="search-input" placeholder="Buscar" />'+
                                    '     <span class="input-group-btn">'+
                                    '         <button id="btn-submit" class="btn botao-busca botao-busca-navbar" type="submit" ng-disabled="!q || (q.length<2)">'+
                                    '             <span class="glyphicon glyphicon-search"></span>'+
                                    '         </button>'+
                                    '     </span>'+
                                    ' </div>'+
                                 '</form>'

    }
});


