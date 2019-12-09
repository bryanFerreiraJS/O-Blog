// récupérer les dépendances
const express = require('express');

// récupérer les données maison
const articles = require('./data/article.json');

// instancier (créer) l'application
const PORT = 3000;
const app = express();


// quelques réglagles "standards"
app.set('view engine', 'ejs'); // le moteur de vues
app.set('views', 'views'); // le dossier des vues

app.use(express.static('public')); // les fichiers statiques (images et css) on été déplacés ici

// routage page d'accueil
app.get('/', (req,res) => {
  // on passe les données à la view "index"
  res.render('index',{articles});
});

// routage page article
app.get('/article/:id', (req, res) => {
  // trouver le bon article dans la liste : on utilise filter et pop
  let id = req.params.id;
  let article = articles.filter( (item) => {return item.id == id;}).pop();

  if (article) {
    res.render('article',  {article});
  } else {
    res.status(404).send('article non trouvé');
  }
  
});


// on lance l'application
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});