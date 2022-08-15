inputEl = document.getElementById("input-movie").value
mainEl = document.querySelector("main")
let html = []


document.getElementById("search-btn").addEventListener("click", ()=> {
    inputEl = document.getElementById("input-movie").value
    fetch(`https://www.omdbapi.com/?s=${inputEl}&t=${inputEl}&apikey=73ad55c2`)
    .then(res => res.json())
        .then(data => {
            if(data.Response === "True"){
                let movieID = []
                let html = []
                mainEl.innerHTML = "404 error"
                for(let i=0; i<10;i++){
                    movieID.push(data.Search[i].imdbID)
                }
                for(let j = 0; j<movieID.length; j++){
                    fetch(`http://www.omdbapi.com/?i=${movieID[j]}&apikey=73ad55c2`)
                    .then(result => result.json())
                    .then(movie =>{
                        html.push(`
                        <div class="movie">
                            <img src="${movie.Poster}" alt="" class="movie-cover">
                            <div class="movie-description">
                                <div class="title-rating">
                                    <h3 class="movie-title">${movie.Title}</h3>
                                    <p class="movie-rating">⭐${movie.Ratings[0].Value}</p>
                                </div>
                            <div class="specs">
                                <p class="duration">${movie.Runtime}</p>
                                <p class="categories">${movie.Genre}</p>
                                <input type="checkbox" name="check" class="add-watchlist" id="${movieID[j]} clickbox" onclick="collectionId()">
                            </div>
                            <p class="movie-trama">${movie.Plot}</p>
                            </div>    
                        </div>`
                    )
                        mainEl.innerHTML = html.reverse().join("")
                        mainEl.classList.remove("empty")
                })
            }   
        }
    })
})
 



function collectionId (){
    const collection = document.getElementsByClassName("add-watchlist")
    for(let i=0; i< collection.length;i++){
        if(collection[i].checked === true){
            localStorage.setItem(`id${collection[i].getAttribute("id")}`,collection[i].getAttribute("id") )
        }
    }

}


