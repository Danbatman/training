$background:#4d7e65$

## après le merge

<style>pre{background: #3f3f3f;}</style>

Pour voir où on en est

````
git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short --all
````

donne

````
*   867fdd6 2016-01-11 | Merge branch 'newVersion' (HEAD -> master) [vallettea]
|\
| * ae5830b 2016-01-11 | added a third file (newVersion) [vallettea]
* | 58f41af 2016-01-11 | added a second file [vallettea]
|/
* 5bf345a 2016-01-11 | changed hello in bonjour [vallettea]
* 2dc24bc 2016-01-11 | added hello to the file [vallettea]
* c04b811 2016-01-11 | added empty file to project [vallettea]						
````