require('dotenv').config();

const express         = require('express');
const expressLayouts  = require('express-ejs-layouts');
const mongoose        = require('mongoose');
const path            = require('path');
const recipeRoutes    = require('./routes/recipes');
const userRoutes      = require('./routes/users');
const methodOverride  = require('method-override');

const app = express();

// ─── Layouts & View Engine ─────────────────────────────────────────────────
app.use(expressLayouts);
app.set('layout', 'partials/layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// default pageTitle for all views
app.use((req, res, next) => {
  res.locals.pageTitle = 'Recipe Manager';
  next();
});

// ─── Database Connection ────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/recipes', recipeRoutes);
app.use('/users',   userRoutes);

app.get('/', (req, res) => res.redirect('/recipes'));

// ─── Server Start ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
