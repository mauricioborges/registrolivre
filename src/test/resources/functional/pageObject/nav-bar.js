var NavBar = (function () {
    function NavBar(){}

    NavBar.prototype.clickCompanyList = function() {
          element(by.css("div.collapse.navbar-mobile.in > ul > li:nth-child(3) > a")).click();
    };

    return NavBar;

})();

module.exports = NavBar;