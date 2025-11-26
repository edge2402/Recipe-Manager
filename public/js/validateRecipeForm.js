document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recipeForm');
  if (!form) return;

  form.addEventListener('submit', event => {
    const title = form.elements['title'].value.trim();
    if (title.length < 3) {
      alert('Title must be at least 3 characters.');
      event.preventDefault();
    }

    const ings = form.elements['ingredients'].value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (ings.length === 0) {
      alert('Please add at least one ingredient, comma-separated.');
      event.preventDefault();
    }

    const steps = form.elements['steps'].value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (steps.length === 0) {
      alert('Please add at least one step, comma-separated.');
      event.preventDefault();
    }
  });
});
