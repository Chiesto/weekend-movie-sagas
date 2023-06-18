import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    const movieDetails = useSelector(store=>store.movieDetails);
    const recentMovie = movieDetails[movieDetails.length-1];
    console.log('RECENT MOVIE =>', recentMovie);
    console.log('isEdit =>', isEdit);

    const handleSaveClick = (event)=>{
        event.preventDefault();
        dispatch({type: 'FETCH_DETAILS'});
        console.log('heres our ID=>', recentMovie.movie_id[0])
        setId(recentMovie.movie_id[0]);
        const movieToDispatch = {
            id,
            title,
            description
        }
        console.log('movie we are dispatching', movieToDispatch);
        //initiate the PUT function to edit our data on the DB
        dispatch({type:'EDIT_MOVIE', payload: {
            id,
            title,
            description
        }})
        setIsEdit(false);
    }
    const handleEditClick = (event) =>{
        event.preventDefault();
        setIsEdit(true)
    }


    useEffect(()=>{
        dispatch({type: 'FETCH_DETAILS'});
    }, []);
    return(
        <div>
            <div>
                {recentMovie?(
                    <> 
                    {isEdit?(
                        <>
                            <input onChange={event=>setTitle(event.target.value)} placeholder={recentMovie.title[0]}/>
                            <br/>
                            <img src={recentMovie.poster[0]}/>
                        
                            
                            <p>Genres: {recentMovie.genres.map(genre=><li key={genre}>{genre}</li>)}</p>
                        
                            <input type='text' onChange={event=>setDescription(event.target.value)} placeholder={recentMovie.description[0]}/>
                        </>
                    ):(
                        <>
                            <h1>{recentMovie.title[0]}</h1>
                            <img src={recentMovie.poster[0]}/>
                        
                            
                            <p>Genres: {recentMovie.genres.map(genre=><li key={genre}>{genre}</li>)}</p>
                        
                            <p>{recentMovie.description[0]}</p>
                        </>
                    )}
                        
                    </>
                ):(
                    <p></p>
                )}
                
                
            </div>

            <button onClick={()=>history.push('/')}>Go Back</button>
            {isEdit?(
                <button onClick={handleSaveClick}>Save</button>
            ):(
                <button onClick={handleEditClick}>Edit</button>
            )}
            
        </div>
    )
}
export default Details;