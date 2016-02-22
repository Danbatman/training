$background:#4d7e65$

## git checkout \#commit

<style>pre{background: #3f3f3f;}</style>

Pour revenir au dernier commit pour ce fichier

````bash
git checkout testFile.txt
````

Pour faire la même chose avec tous les fichiers à la fois (dans le cas d'un projet complet): 

````bash
git checkout --hard HEAD
````
