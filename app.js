// script.js
const apiUrl = 'http://localhost:3000/api/recipes'; // Update with the correct API endpoint

function uploadRecipe(recipe) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Recipe uploaded successfully:', data);
        // Optionally, refresh the recipe list or provide feedback to the user
    })
    .catch((error) => {
        console.error('Error uploading recipe:', error);
    });
}

function defaultFn() {
	const defaultFood = 'chicken';
	searchFn(defaultFood);
}
document.getElementById('recipe-upload-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    const recipe = {
        title: document.getElementById('recipe-title').value,
        ingredients: document.getElementById('ingredients').value,
        steps: document.getElementById('steps').value,
        image: document.getElementById('image').value,
    };
    uploadRecipe(recipe); // Call the function to upload the recipe
});

document.getElementById('searchBtn').addEventListener('click', () => {

    const userIn = document.getElementById('searchInput').value.trim();

		if (userIn !== '') {
			searchFn(userIn);
		} else {
			alert('Please enter a recipe name.');
		}
	});
document.addEventListener('click', (event) => {
	if (event.target.className === 'show-recipe-btn') {
		const rId = event.target.getAttribute('data-id');
		modalFn(rId);
	}
	if (event.target.id === 'closeBtn') {
		closeModalFn();
	}
});
defaultFn();
function searchFn(query) {
    const cuisine = document.getElementById('cuisineFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    const url = `${apiUrl}?query=${query}&cuisine=${cuisine}&difficulty=${difficulty}`;

	fetch(url)
		.then(res => res.json())
		.then(tmp => {
			if (tmp.meals) {
				showRecpsFn(tmp.meals);
			} else {
				noRecFn();
			}
		})
		.catch(error => console
			.error('Error fetching recipes:', error));
}
function showRecpsFn(r) {
	const rCont = document.getElementById('recipeContainer');
	rCont.innerHTML = '';
	r.slice(0, 20).forEach(recipe => {
		const c = document.createElement('div');
		c.classList.add('animate__animated',
			'animate__fadeIn', 'recipe-card');
		c.innerHTML = `
			<h3>${recipe.strMeal}</h3>
			<img src="${recipe.strMealThumb}"
			alt="${recipe.strMeal}">
			<p>${recipe.strArea}</p>
			<p>${recipe.strCategory}</p>
			<button class="show-recipe-btn"
			data-id="${recipe.idMeal}">Show Recipe</button>
		`;

		rCont.appendChild(c);
	});
	if (r.length === 1) {
		const card = rCont.firstChild;
		card.style.margin = 'auto';
	}
}
function noRecFn() {
	const rCont = document.getElementById('recipeContainer');
	rCont.innerHTML = '<p>No Recipe found</p>';
}
function modalFn(recipeId) {
	const mData = document.getElementById('modalContent');
	mData.innerHTML = '';
	fetch(`
...`)
		.then(response => response.json())
		.then(data => {
			const rep = data.meals[0];
			mData.innerHTML = `
				<h2>${rep.strMeal}</h2>
				<h3>Instructions:</h3>
				<p>${formatFn(rep.strInstructions)}</p>
			`;
			document.getElementById('recipeModal')
				.style.display = 'block';
		})
		.catch(error => console.error('Error fetching recipe details:',
			error));
}
function formatFn(instructions) {
	return instructions.split('\r\n').filter(instruction =>
		instruction.trim() !== '').join('<br>');
}
function closeModalFn() {
	document.getElementById('recipeModal').style.display = 'none';
}
