$background:#4d7e65$

## git checkout \#commit

<style>pre{background: #3f3f3f;}</style>

Pour se déplacer dans l'histoire

````bash
git checkout 2dc24bc314f
````

Si vous regardez votre fichier, vous verrez qu'il est revenu à l'état où il y avait hello. Pour revenir au dernier état

````bash
git checkout master
````

**Attention**: pour se déplacer dans l'histoire, il faut être "clean", c'est-à-dire ne pas avoir de modifications non-commitées.