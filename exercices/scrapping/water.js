

var fs = require('fs');
var dump = require('utils').dump;


var casper = require('casper').create({
    pageSettings: {
        webSecurityEnabled: false,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0"
    }
    // ,verbose: true,
    // logLevel: "debug"
});

casper.selectOptionByValue = function(selector, valueToMatch){
    this.evaluate(function(selector, valueToMatch){
        var select = document.querySelector(selector),
            found = false;
        Array.prototype.forEach.call(select.children, function(opt, i){
            if (!found && opt.value.indexOf(valueToMatch) !== -1) {
                select.selectedIndex = i;
                found = true;
            }
        });
        // dispatch change event in case there is some kind of validation
        var evt = document.createEvent("UIEvents"); // or "HTMLEvents"
        evt.initUIEvent("change", true, true);
        select.dispatchEvent(evt);
    }, selector, valueToMatch);
};

casper.start("http://orobnat.sante.gouv.fr/orobnat/afficherPage.do?methode=menu&usd=AEP&idRegion=72", function() {
    this.selectOptionByValue('select[name="departement"]', "033") 
});

casper.then( function() {
    this.selectOptionByValue('select[name="communeDepartement"]', "063") 
});

casper.then(function(){
    this.waitUntilVisible('input[value="Rechercher"]', function() {
        this.click('input[value="Rechercher"]');
    });
})

casper.then(function(){
    var value = this.evaluate(getValue);
    dump(value);
});

function getValue() {
    var tables = document.querySelectorAll('table[id="tableau"]');
    var last = tables[tables.length - 1];
    var row = last.querySelectorAll('tr')[1];
    var line = row.querySelectorAll('td')[1];
    return line.textContent;
}

casper.run();

