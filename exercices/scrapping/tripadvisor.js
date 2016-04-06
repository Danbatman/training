

var fs = require('fs');
var dump = require('utils').dump;


var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0"
    }
    ,verbose: true,
    logLevel: "debug"
});



casper.start("https://www.tripadvisor.fr", function() {
    this.fill('select[id="GEO_SCOPED_SEARCH_INPUT"]', "Biarritz, Pays Basque, France");
    // this.fill('select[id="mainSearch"]', "Hôtels");
});

// casper.then( function() {
//     this.selectOptionByValue('select[name="communeDepartement"]', "063") 
// });

// casper.then(function(){
//     this.waitUntilVisible('input[value="Rechercher"]', function() {
//         this.click('input[value="Rechercher"]');
//     });
// })

casper.then(function(){
    var value = this.evaluate(getValue);
    dump(value);
});

function getValue() {
    var annonces = document.querySelectorAll('div[class="listing_title"]');
    return annonces.length;
}

casper.run();

