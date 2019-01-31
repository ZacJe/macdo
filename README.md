## Installation de MongoDB

Téléchargez la dernière version de MongoDB à l'adresse suivante : https://www.mongodb.com/download-center/community et effectuez l'installation.

Ensuite vous devez créer le dossier qui contiendra vos bases de données. Pour cela vous devez créer les dossiers suivant:

```
C:\data\db
```

Pour démarrer MongoDB vous devez exécuter le fichier « *mongod.exe* ». Ce fichier se trouve dans le dossier "*bin*" du répertoire d'installation de MongoDB. Par défaut le répertoire d'installation sur trouve sur:

```
C:\Program Files\MongoDB\bin\mongod.exe
```

Si MongoDB a bien démarré, vous devriez observé dans la console à la dernière ligne :

*"waiting for connections on port 27017"*

Si ce n'est pas le cas, MongoDB n'a peut-être pas trouvé le dossier qui contiendra vos bases de données. Dans ce cas, dirigez-vous via l'invite de commandes dans le répertoire:

```
C:\Program Files\MongoDB\bin
```

Puis saisissez cette ligne de commande :

```
mongod.exe --dbpath C:\data
```



## Installation de NodeJS

Pour installer Node.js sous Windows, il suffit de télécharger l'installeur qui est proposé sur le [site de Node.js](https://nodejs.org/). Cliquez simplement sur le lien Install.

Lancer l'installeur et suivez les étapes d'installation.

***Node.js command prompt*** a été installé. Il s'agit d'une console de windows configurée pour reconnaître NodeJS.



## Installation et démarrage du projet

Téléchargez le zip du projet, dézippez-le et mettez le projet à la racine du disque local C:\ de votre PC. Son chemin doit maintenant être C:\macdo. 

Dirigez-vous à l'aide de l'invit de commande dans ce dossier :

```
C:\Program Files\MongoDB\bin
```

Puis, afin d'importer la base de données, saisissez la commande suivante :

```
mongorestore -d macdo C:\test\bdd
```

Avant de lancer le projet, vous devez installer les modules node manquants.

Pour cela, ouvrez le *Node.js command prompt*.

Dirigez-vous via le *Node.js command prompt* dans le dossier du projet, puis saisissez la commande suivante : 

```
npm install
```

L'installation des modules peut durer de quelques secondes à quelques minutes selon l'état de votre connexion. Une fois celle-ci terminée, vous pouvez lancer l'API avec la commande suivante :

```
npm start
```



## Test de l'API

Afin de tester l'API, vous pouvez utiliser POSTMAN en testant chacune des routes suivantes.



**La route suivante permet de renvoyer les sandwichs correspondant à une période.**

```
GET | localhost:3000/sandwichs?period=summer
```

period peut prendre les valeurs "summer", "winter", "spring" ou "fall". 



**La route suivante permet de créer un sandwich pour une ou toutes les périodes**

```
POST | localhost:3000/sandwichs
```

body example : 

```
{
	"id" : "Big Mac",
	"link" : "https://image.bigmac.com",
	"constitution" : ["salade","tomate","ognion"],
	"period" : "winter"
}
```

period peut prendre également la valeur "all" dans le cas du POST. Cela ajoutera le sandwich à toutes les périodes.



**La route suivante permet de mettre à jour un sandwich**

```
PUT | localhost:3000/sandwichs/BigMac
```

body example :

```
{
	"link" : "https://image.bigmac.com",
	"constitution" : ["salade","tomate","ognion","cheddar"]
}
```



**La route suivante permet de mettre à jour une période. Une période contient la liste des ID des sandwichs. Autrement dit, cette route permet de supprimer un sandwich pour une période.**

```
PUT | localhost:3000/period/summer
```

body example :

```
{
    "sandwichs" : ["Big Mac"]
}
```

