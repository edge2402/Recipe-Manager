// routes/recipes.js
const express = require('express');
const router  = express.Router();
const Recipe  = require('../models/recipe.model');

// ─── List all recipes ────────────────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.render('recipe-list', {        // ← now plain 'recipe-list'
      recipes,
      pageTitle: 'All Recipes'
    });
  } catch (err) {
    next(err);
  }
});

// ─── Show “create” form ───────────────────────────────────────────────────────
router.get('/new', (req, res) => {
  res.render('recipe-create', {      // ← plain 'recipe-create'
    recipe: {},
    pageTitle: 'Create Recipe'
  });
});

// ─── Create a recipe ─────────────────────────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { title, ingredients, steps, imageUrl } = req.body;
    await Recipe.create({
      title: title.trim(),
      ingredients: ingredients.split(',').map(s => s.trim()),
      steps:     steps.split(',').map(s => s.trim()),
      imageUrl:  imageUrl.trim()
    });
    res.redirect('/recipes');
  } catch (err) {
    next(err);
  }
});

// ─── View recipe detail ──────────────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipe-detail', {     // ← plain 'recipe-detail'
      recipe,
      pageTitle: recipe.title
    });
  } catch (err) {
    next(err);
  }
});

// ─── Show “edit” form ─────────────────────────────────────────────────────────
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    recipe.ingredients = recipe.ingredients.join(', ');
    recipe.steps       = recipe.steps.join(', ');
    res.render('recipe-edit', {       // ← plain 'recipe-edit'
      recipe,
      pageTitle: 'Edit Recipe'
    });
  } catch (err) {
    next(err);
  }
});

// ─── Update a recipe ─────────────────────────────────────────────────────────
router.put('/:id', async (req, res, next) => {
  try {
    const { title, ingredients, steps, imageUrl } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, {
      title:       title.trim(),
      ingredients: ingredients.split(',').map(s => s.trim()),
      steps:       steps.split(',').map(s => s.trim()),
      imageUrl:    imageUrl.trim()
    }, { runValidators: true });
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

// ─── Delete a recipe ─────────────────────────────────────────────────────────
router.delete('/:id', async (req, res, next) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    next(err);
  }
});

//route to handle anchor tag delete
router.get('/:id/delete', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    res.status(500).send('Error deleting recipe');
  }
});

module.exports = router;
