const express = require('express');
const router  = express.Router();
const Recipe = require('../models/recipe.model');

// List all recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.render('recipe-list', {
      recipes,
      pageTitle: 'All Recipes'
    });
  } catch (err) {
    next(err);
  }
});

// Show “create recipe” form
router.get('/new', (req, res) => {
  res.render('recipe-create', {
    recipe: {},
    pageTitle: 'Create Recipe'
  });
});

// Create a new recipe
router.post('/', async (req, res, next) => {
  try {
    const { title, ingredients, steps, imageUrl } = req.body;
    const newRecipe = {
      title: title.trim(),
      ingredients: ingredients.split(',').map(s => s.trim()),
      steps: steps.split(',').map(s => s.trim()),
      imageUrl: imageUrl.trim()
    };
    await Recipe.create(newRecipe);
    res.redirect('/recipes');
  } catch (err) {
    next(err);
  }
});

// View single recipe
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipe-detail', {
      recipe,
      pageTitle: recipe.title
    });
  } catch (err) {
    next(err);
  }
});

// Show “edit recipe” form
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');

    recipe.ingredients = recipe.ingredients.join(', ');
    recipe.steps       = recipe.steps.join(', ');
    res.render('recipe-edit', {
      recipe,
      pageTitle: 'Edit Recipe'
    });
  } catch (err) {
    next(err);
  }
});

// Update recipe
router.put('/:id', async (req, res, next) => {
  try {
    const { title, ingredients, steps, imageUrl } = req.body;
    const updated = {
      title: title.trim(),
      ingredients: ingredients.split(',').map(s => s.trim()),
      steps: steps.split(',').map(s => s.trim()),
      imageUrl: imageUrl.trim()
    };
    await Recipe.findByIdAndUpdate(req.params.id, updated, { runValidators: true });
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

// Delete recipe
router.delete('/:id', async (req, res, next) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
