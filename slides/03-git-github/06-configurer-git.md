$background:#4d7e65$

## Configurer git

<style>pre{background: #3f3f3f;}</style>

````bash
# dans le cas où vous êtes derrière un proxy
git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:8080
git config --global https.proxy https://proxyuser:proxypwd@proxy.server.com:8080

# si vous ne l'avez jamais fait auparavant
git config --global user.name "Your Name"
git config --global user.email "your_email@whatever.com"

# pour windows
git config --global core.autocrlf true
git config --global core.safecrlf true
````