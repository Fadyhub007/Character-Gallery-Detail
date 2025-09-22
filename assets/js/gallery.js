const form = document.getElementById("characterForm");
const gallery = document.getElementById("gallery");

// Helper: Get characters array from localStorage
function getCharacters() {
  return JSON.parse(localStorage.getItem('CharacterGallery')) || [];
}

// Helper: Save dragons array to localStorage
function savecharacter(characters) {
  localStorage.setItem('characterGallery', JSON.stringify(characters));
}
// Render all dragons in the gallery
function renderGallery() {
  const characters = getCharacters();
  gallery.innerHTML = '';
  characters.forEach((character, idx) => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <img src="${character.imgUrl}" alt="${character.name}" />
      <h2>${character.type}</h2>
      <h2>${character.name}</h2>
      <div class="description">${character.description}</div>
    `;
    gallery.appendChild(card);
  });
}
// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const character = {
    name: form.name.value.trim(),
    desc: form.description.value.trim(),
    type: form.type.value,
    imgUrl: form.imgUrl.value.trim()
  };
  const characters = getCharacters();
  characters.push(character);
  savecharacter(characters);
  renderGallery();
  form.reset();
});

// On page load, render the gallery
renderGallery();
