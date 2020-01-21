// https://bootswatch.com/cyborg/bootstrap.min.css

$(document).ready(

    ()=>{
        //alert(1);
        $('#searchForm').on('submit', (e)=>{
            console.log($("#searchText").val());
            let searchText = $("#searchText").val();
            getMovies(searchText);

            e.preventDefault();

        });
    }
);

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=321eaeda')
        .then((res)=>{
            console.log("res::",res);
            let movies =  res.data.Search;
            let output = '';
            $.each(movies, (index, movie)=>{
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                        <img src="${movie.Poster}">

                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${ movie.imdbID }')" class="btn btn-primary" href="#">
                        Movie Details
                        </a>
                        </div>

                    </div>
                `; //temp literals for using html and js in mix

                //merge the output into a div
                $("#movies").html(output);
                
            });
        })
        .catch(
            (err)=>{
                console.log(err);
            }
        );
}//getMov
function movieSelected(id){

    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;


}//movieSelected

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    console.log("movieId::", movieId);
    axios.get('http://www.omdbapi.com?apikey=321eaeda&i=' + movieId)
    .then((res)=>{
        console.log("res::", res);
             
        let movie = res.data;

        let output = `
            <div class="row">
             <div class="col-md-4">
                <img  src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul clas="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                


            </ul>
            </div>
            </div>
        <div class="row">
            <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB
            </a>
            <a href="index.html" class="btn btn-default">Go back to search</a>

            </div>
        </div>
        `; //temp literals for  mixing js and html
        $("#movie").html(output);

    })
    .catch(
        (err)=>{
            console.log(err);
        }
    );


}//getMovie