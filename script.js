/*
Created by ChatGPT
*/
/*----------------- API SCRIPT ------------------------*/
// Setting initial page to 1
let page = 1;

// The API key for TMDb API
const API_KEY = '654538901c1e1eb69121d86164274f5d';

//Loading popular movies from the API
const loadMovies = async(query = '') => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en&page=${page}`;
    
    //If query is provided, search movies by the query
    if(query){
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en&query=${query}&page=${page}`;
    }
    
    try {
        const respond = await fetch(url);
        
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
};

//Initial loading
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

/*----------------- SEARCH SCRIPT ------------------------*/
//Getting the search form and search input
const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');

//Adding submit event listener to the search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    //Loading movies by the search query
    loadMovies(searchQuery.value);
    
    //Clearing the search input value
    searchQuery.value = '';
});
