import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function AddMovie(){
    const history = useHistory()
    const dispatch = useDispatch();
    const [selectedGenre, setSelectedGenre] = useState('');
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const genres = useSelector(store=>store.allGenres);

    //submits the form calling the post function to update my list;
    const handleSubmit = (event)=>{
        event.preventDefault();
        dispatch({type: 'MOVIE_TO_ADD', payload: {
            title,
            poster,
            description,
            selectedGenre
        }})
        dispatch({type:'POST_MOVIE'})

    }

    //call the get function to load my genres. 
    useEffect(()=>{
        dispatch({type:'FETCH_ALL_GENRES'});
    }, []);

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Movie Title" onChange={event=>setTitle(event.target.value)}/>
                <input required type="text" placeholder="Poster Image URL" onChange={event=>setPoster(event.target.value)}/>
                <input required type="text" placeholder="Movie Description" onChange={event=>setDescription(event.target.value)}/>
                <select value={selectedGenre} onChange={event=>setSelectedGenre(event.target.value)}>
                    <option value=''>Select a genre</option>
                    {genres.map(genre=>(
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>
                <button type="submit">Save</button>
            </form>
            <button onClick={()=>history.push('/')}>Cancel</button>
        </div>
    )
}
export default AddMovie;