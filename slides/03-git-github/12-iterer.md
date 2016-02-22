$background:#4d7e65$

## Itérer

<style>pre{background: #3f3f3f;}</style>

On itère au fur et a mesure des changements qu'on veut persister :

````bash
// on ajoute une ligne au fichier (normalement utiliser l'éditeur)
echo "hello" > testFile.txt
git status
git commit -am"added hello to the file"
````