require('dotenv').config();
const mongoose = require('mongoose');
const Recipe   = require('./models/recipe.model');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error(err));

const seeds = [
  {
    title: 'Spaghetti Bolognese',
    ingredients: ['Spaghetti', 'Minced Meat', 'Tomato Sauce'],
    steps: ['Cook pasta', 'Prepare sauce', 'Combine and serve'],
    imageUrl: 'https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36.jpg'
  },
  {
    title: 'Chicken Curry',
    ingredients: ['Chicken Thighs', 'Curry Powder', 'Coconut Milk', 'Onion', 'Garlic'],
    steps: [
      'Sauté onion and garlic',
      'Add chicken and brown',
      'Stir in curry powder',
      'Pour coconut milk and simmer'
    ],
    imageUrl: 'https://bigoven-res.cloudinary.com/image/upload/chicken-curry-59.jpg'
  },
  {
    title: 'Vegan Chili',
    ingredients: ['Beans', 'Tomatoes', 'Bell Pepper', 'Onion', 'Chili Powder'],
    steps: [
      'Sauté onion and pepper',
      'Add beans and tomatoes',
      'Season with chili powder',
      'Simmer 20 minutes'
    ],
    imageUrl: 'https://www.cookingclassy.com/wp-content/uploads/2018/01/vegetable-chili-2.jpg'
  },
  {
    title: 'Classic Pancakes',
    ingredients: ['Flour', 'Milk', 'Eggs', 'Baking Powder', 'Salt'],
    steps: [
      'Mix dry ingredients',
      'Whisk in milk and eggs',
      'Pour batter on hot griddle',
      'Flip when bubbles form'
    ],
    imageUrl: 'https://images-gmi-pmc.edge-generalmills.com/df109202-f5dd-45a1-99b4-f10939afd509.jpg'
  },
];

async function seedDB() {
  await Recipe.deleteMany({});
  await Recipe.insertMany(seeds);
  console.log('Database seeded with', seeds.length, 'recipes');
  mongoose.connection.close();
}

seedDB();
