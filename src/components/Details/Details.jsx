import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const movieDetails = useSelector(store=>store.movieDetails);

    const handleSaveClick = ()=>{
        //initiate the PUT function to edit our data on the DB
        dispatch('EDIT_MOVIE', {
            title,
            description
        })
        //get the updated data from the DB
        dispatch('FETCH_DETAILS')
        setIsEdit(false);
    }


    useEffect(()=>{
        dispatch({type: 'FETCH_DETAILS'});
    }, []);
    const recentMovie = movieDetails[movieDetails.length-1];
    console.log('RECENT MOVIE =>', recentMovie);
    console.log('isEdit =>', isEdit);
    return(
        <div>
            <div>
                {recentMovie?(
                    <> 
                    {isEdit?(
                        <>
                            <input placeholder={recentMovie.title[0]}/>
                            <br/>
                            <img src={recentMovie.poster[0]}/>
                        
                            
                            <p>Genres: {recentMovie.genres.map(genre=><li key={genre}>{genre}</li>)}</p>
                        
                            <input type='text' placeholder={recentMovie.description[0]}/>
                        </>
                    ):(
                        <>
                            <h1>{recentMovie.title[0]}</h1>
                            <img src={recentMovie.poster[0]}/>
                        
                            
                            <p>Genres: {recentMovie.genres.map(genre=><li key={genre}>{genre}</li>)}</p>
                        
                            <p>{movieDetails[movieDetails.length-1].description[0]}</p>
                        </>
                    )}
                        
                    </>
                ):(
                    <p></p>
                )}
                
                
            </div>

            <button onClick={()=>history.push('/')}>Go Back</button>
            {isEdit?(
                <button onClick={()=>setIsEdit(false)}>Save</button>
            ):(
                <button onClick={()=>setIsEdit(true)}>Edit</button>
            )}
            
        </div>
    )
}
export default Details;