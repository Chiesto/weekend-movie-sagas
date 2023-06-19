import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    
    const handleClick = (movie)=>{
        dispatch({ type: 'POST_SELECTED_MOVIE', payload: movie.id });
        history.push(`/details/${movie.id}`);
    }

    const handleClick2 = ()=>{
        history.push('/addMovie');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    return (
        <main>
            <button onClick={handleClick2}>Add Movie!</button>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} onClick={()=>handleClick(movie)}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;