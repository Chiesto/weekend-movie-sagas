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

    return(
        <div>
            <div>
                <h1>{movie.title}</h1>
                <img src={movie.poster}/>
                {genres.data? (
                    <p>Genres: {genres.data.map(genre=><li key={genre}>{genre}</li>)}</p>
                ) : (
                    <p></p>
                )}
                <p>{movie.description}</p>
            </div>

            <button onClick={()=>history.push('/')}>Go Back</button>
        </div>
    )
}
export default Details;