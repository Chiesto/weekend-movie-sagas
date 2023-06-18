import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    const dispatch = useDispatch();
    const history = useHistory();
    const movieDetails = useSelector(store=>store.movieDetails);

    useEffect(()=>{
        dispatch({type: 'FETCH_DETAILS'})
    }, []);
    console.log('movie details =>', movieDetails);
    const recentMovie = movieDetails[movieDetails.length-1];
    console.log('RECENT MOVIE =>', recentMovie);
    return(
        <div>
            <div>
                {recentMovie?(
                    <>
                        <h1>{recentMovie.title[0]}</h1>
                        <img src={recentMovie.poster[0]}/>
                    
                        
                        <p>Genres: {recentMovie.genres.map(genre=><li key={genre}>{genre}</li>)}</p>
                    
                        <p>{movieDetails[movieDetails.length-1].description[0]}</p>
                    </>
                ):(
                    <p></p>
                )}
                
                
            </div>

            <button onClick={()=>history.push('/')}>Go Back</button>
        </div>
    )
}
export default Details;