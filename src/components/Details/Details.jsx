import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    const history = useHistory();
    const movie = useSelector(store=>store.movieId);
    const genres = useSelector(store=>store.genres);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: 'FETCH_GENRE' });
    }, []);
console.log('OUR GENRES', genres.data);
    return(
        <div>
            <div>
                <h1>{movie.title}</h1>
                <img src={movie.poster}/>
                <p>Genres: {genres.data.map(genre=><li>{genre}</li>)}</p>
                <p>{movie.description}</p>
            </div>

            <button onClick={()=>history.push('/')}>Go Back</button>
        </div>
    )
}
export default Details;