var NavBar = function () {

    this.clickCompanyList = function() {
          element(by.css('div.collapse.navbar-mobile.in > ul > li:nth-child(3) > a')).click();
    };

};

module.exports = NavBar;