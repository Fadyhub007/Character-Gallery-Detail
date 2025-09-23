const characterDetails = document.getElementById("characterDetails");
const bagList = document.getElementById("bagList");
const itemForm = document.getElementById("itemForm");

// Get selected character index from sessionStorage
const idx = parseInt(sessionStorage.getItem("selectedCharacterIdx"), 10);

// Get characters from localStorage
function getCharacters() {
    return JSON.parse(localStorage.getItem('characterGallery')) || [];
}

function saveCharacters(characters) {
    localStorage.setItem("characterGallery", JSON.stringify(characters));
}

// Render the character's bag items
function renderBagItems() {
    bagList.innerHTML = ''; // Clear the current list
    if (character.bag && character.bag.length > 0) {
        character.bag.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<span>${item.type}: ${item.name}</span>`;
            bagList.appendChild(li);
        });
    } else {
        bagList.innerHTML = '<li>No items yet</li>';
    }
}

// Render one big card with details
function renderCharacterCard() {
    characterDetails.innerHTML = `
        <div class="character-card-big">
            <img src="${character.imgUrl}" alt="${character.name}">
            <h2>${character.name} (${character.type})</h2>
            <p>${character.description}</p>
        </div>
    `;
    renderBagItems(); // Also render the bag items on load
}

// Handle new item form
itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("itemType").value;
    const name = document.getElementById("itemName").value.trim();

    if (!type || !name) {
        alert("Please fill in all fields");
        return;
    }

    if (!character.bag) character.bag = [];
    character.bag.push({ type, name });

    // Save back to localStorage using the correct index
    characters[idx] = character;
    saveCharacters(characters);

    renderBagItems(); // Update only the bag list
    itemForm.reset();
});

// Initial render
renderCharacterCard();