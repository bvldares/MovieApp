function localStorageCollector(){
    let values = []
    let keys = Object.keys(localStorage)
    let i = keys.length
    while(i--){
        values.push( localStorage.getItem(keys[i]) )
    }
    return values
}

const idArray = localStorageCollector()
console.log(idArray)

let htmlWishList = []

for(let i=0; i<idArray.length; i++){
fetch(`http://www.omdbapi.com/?i=${idArray[i]}&apikey=73ad55c2`)
.then(res => res.json())
.then(movie =>{ 
    htmlWishList.push(`
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
            <p class="categories">Add to Watchlist</p>
            <input type="checkbox" name="check" class="add-watchlist">
        </div>
        <p class="movie-trama">${movie.Plot}</p>
        </div>    
    </div>`    
    )
    document.getElementById("wishlist-main").innerHTML = htmlWishList
    document.getElementById("wishlist-main").classList.remove("empty")
})
}
