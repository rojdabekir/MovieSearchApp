const mainPage = document.querySelector(".movie-app");
const detailsPage = document.querySelector(".movie-details.hidden");
const goBackBtn = document.getElementById("go-back-btn");
const searchBtn = document.querySelector(".search-btn");
const searchBox = document.getElementById("search-input");
const errorMessage = document.getElementById("error-message");
const moviesBox = document.querySelector(".movies-box");

function openDetails(){
    detailsPage.classList.remove("hidden");
    mainPage.classList.add("hidden");
}

function openMainPage(){
    detailsPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
}

goBackBtn.addEventListener("click",openMainPage);

function createMovieCard(movie){
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    const poster = document.createElement("img");

    if(movie.poster_path){
       poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 
    }
    else{
        poster.src = "images/no-poster.png";
    }
    
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";
    const movieText = document.createElement("h4");
    movieText.textContent = "MOVIE";
    const movieName = document.createElement("h3");
    movieName.textContent = movie.title;
    movieInfo.appendChild(movieText);
    movieInfo.appendChild(movieName);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);

    return movieCard;  
}

function createDetails(data){
    const detailsPoster = document.getElementById("poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRating = document.getElementById("movie-rating");
    const movieDate = document.getElementById("movie-date");
    const movieDuration = document.getElementById("movie-duration");
    const movieGenresBox = document.getElementById("movie-genres");
    const moviePlot = document.getElementById("movie-plot");

    if(data.poster_path){
       detailsPoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`; 
    }
    else{
        detailsPoster.src = "images/no-poster.png";
    }
    
    movieTitle.textContent = data.title;
    movieRating.textContent = `${Math.round(data.vote_average)}/10`;
    const releaseDate = data.release_date;
    const formattedDate = new Date(releaseDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    movieDate.textContent = `Released: ${formattedDate}`;
    movieDuration.textContent = `${data.runtime} minutes`;
    moviePlot.textContent = data.overview;

    data.genres.forEach(function(genre){
        const newGenre = document.createElement("p");
        newGenre.textContent = genre.name;
        movieGenresBox.appendChild(newGenre);
    });
}

function createCast(data){
    const movieCastBox = document.querySelector(".movie-cast");
    data.cast.slice(0,50).forEach(function(actor){
        const movieActor = document.createElement("p");
        movieActor.textContent = `${actor.name} as ${actor.character}`;
        movieCastBox.appendChild(movieActor);
    });
}

function searchMovie(){
    errorMessage.textContent = "";
    moviesBox.innerHTML = "";
    const movieNameSearch = searchBox.value.trim();
    
    if (movieNameSearch === "") {
        return;
    }
    
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${movieNameSearch}`;

    fetch(apiUrl, {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
    })   
    .then(response => {
        if (!response.ok) {
            throw new Error("Movie not found");
        }
        return response.json();
    })
    .then(data => {
        //console.log(data);

        data.results.forEach(function(movie){
            const newCard = createMovieCard(movie);
            moviesBox.appendChild(newCard);
            const movieId = movie.id;
            newCard.addEventListener("click", () => {
                clickOnCard(movieId);
            });
        })
    })
    .catch(error => {
        errorMessage.textContent = "Sorry...Movie not found";
    });
}

function clickOnCard(id){
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}`;
    const apiUrlCast = `https://api.themoviedb.org/3/movie/${id}/credits`;
    fetch(apiUrl,{
        headers:{
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Movie details not found");
        }
        return response.json();
    })
    .then(data => {
        //console.log(data);
        openDetails();
        createDetails(data);
    });

    fetch(apiUrlCast,{
        headers:{
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Movie cast not found");
        }
        return response.json();
    })
    .then(data => {
        //console.log(data);
        createCast(data);
    });
}

searchBtn.addEventListener("click", searchMovie);

searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchMovie();
    }
});