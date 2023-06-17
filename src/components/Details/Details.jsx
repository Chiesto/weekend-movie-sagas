import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function Details(){
    const history = useHistory();
    const movie = useSelector(store=>store.movieId);

    return(
        <div>
            <div>
                <h1>{movie.title}</h1>
                <img src={movie.poster}/>
                <p>{movie.description}</p>
            </div>

            <button onClick={()=>history.push('/')}>Go Back</button>
        </div>
    )
}
export default Details;