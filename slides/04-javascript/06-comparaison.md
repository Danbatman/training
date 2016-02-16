# Comparaison

* TOUJOURS utiliser `===` et `!==`
    * `==` "presque égal"
    * `===` "strictement égal"
* Comparaison par référence pour les objets, par valeur pour le reste.

````js
console.log(1 === 1)
console.log('yo' === 'yo')

var o = { a: 1 };
var o2 = o;
console.log(o === o2);

var o3 = { a: 1 };
console.log(o !== o3);
````
