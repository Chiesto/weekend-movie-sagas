import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider, useSelector } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_GENRE', fetchGenre);
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_ALL_GENRES', fetchAllGenres);
    yield takeEvery('POST_MOVIE', postMovie);
}

// const movie = useSelector(store=> store.movieId);
//used to get our list of genres from the DB
function* fetchGenre() {
    const state = storeInstance.getState();
    const movie = state.movieId;
    try{
        const genre = yield axios.get(`/api/genre/pick/${movie.id}`);
        console.log('heres the genre=>', genre);
        yield put({type: 'SET_GENRES', payload: genre})
    } catch(error){
        console.log('fetchGenre DIDNT WORK', error);
    }
}



function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchAllGenres(){
    try{
        const genres = yield axios.get('/api/genre/all-genres');
        console.log('OUR GENRES!!!! =>', genres);
        yield put({type: 'SET_ALL_GENRES', payload: genres.data})
    } catch{
        console.log('Problems in fetchAllGenres');
    }
}

function* postMovie(){
    const state = storeInstance.getState();
    const movie = state.movieToAdd;
    try{
        yield axios.post('/api/movie', movie)
    }catch{
        console.log('postMovie isnt working');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
const allGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const movieId = (state = {}, action)=>{
    switch(action.type){
        case 'MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
const movieToAdd = (state = {}, action)=>{
    switch(action.type){
        case 'MOVIE_TO_ADD':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieId,
        allGenres,
        movieToAdd
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
