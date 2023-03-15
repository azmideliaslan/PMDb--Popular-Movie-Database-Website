/*
Created by azmideliaslan
*/
/*----------------- API SCRIPT ------------------------*/
// Setting initial page to 1
let page = 1;

//Loading popular movies from the API
const loadMovies = async() => {
	try {
		// Get your api from https://www.themoviedb.org/settings/api
		const respond = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=654538901c1e1eb69121d86164274f5d&language=en&page=${page}`);
		//If the response is correct
		if(respond.status === 200){
			const data = await respond.json();
			
			let films = '';
			data.results.forEach(film => {
				films += `

			        <div class="gallery-item">
			            <img class="gallery-image" src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="">
			            <h3 class="title">${film.title}</h3>
			            <p>${film.vote_average}/10</p>
			            <p>${film.release_date}</p>
			            <p> ${film.overview}</p>
			        </div>
					
				`;
			});
            //Inject to container
			document.getElementById('gallery-grid').innerHTML = films;
		}
		else if(respond.status === 401){console.log('the key is wrong');}
		else if(respond.status === 404){console.log('Item not found');}
		else {console.log('There was a mistake');}
	} 
	catch(error){console.log(error);}
}
loadMovies();


/*----------------- BUTTON SCRIPT ------------------------*/
// Getting the previous and next buttons
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// Adding click event listeners to the buttons
btnNext.addEventListener('click', () => {
	// Stopping pages after 20 pages
	if(page < 20){
		page += 1;
		loadMovies();
	}
});
btnPrev.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		loadMovies();
	}
});
// i will add if i go press next when tha page num 20, let it go first page
