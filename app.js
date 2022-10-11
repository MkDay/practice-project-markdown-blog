const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const articleRoutes = require('./routes/articleRoutes');
const Article = require('./models/Article');
const keys = require('./config/keys');


const app = express();

app.set('view engine', 'ejs');

// urlencoded
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride('_method'));

// connect to db
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to db');
});

app.get('/', async (req, res) => {

    const articles = await Article.find().sort({ createdAt: 'desc' });

    res.render('articles-views/index', { articles });
});

// routes

app.use('/articles', articleRoutes);


const port = 3000;
app.listen(port, () => {
    console.log('listening at port ' + port);
});

// timestamp [ 23.59 ]