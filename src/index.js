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
    yield takeEvery('POST_SELECTED_MOVIE', postSelectedMovie);
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_ALL_GENRES', fetchAllGenres);
    yield takeEvery('POST_MOVIE', postMovie);
    yield takeEvery('FETCH_DETAILS', fetchAllDetails);
}

// post the ID of our selected movie to the DB so we can refresh and
// still have that information. Using a new table so we can have a history.
function* postSelectedMovie(action) {
    try{
        console.log('selected movie ID=>', action.payload);
        yield axios.post(`/api/movie/allDetails/${action.payload}`);
        console.log('checking for errors');
        

        //once we add a movie we want to update the store
        yield dispatch({type: 'FETCH_DETAILS'});
    } catch(error){
        console.log('post selected movie DIDNT WORK', error);
    }
}

//fetching details of the selected movie
function* fetchAllDetails() {
    try {
        const movieDetails = yield axios.get(`/api/movie/allDetails`);
        console.log('get all:', movieDetails.data);
        yield put({ type: 'SET_DETAILS', payload: movieDetails.data });

    } catch {
        console.log('get all error');
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
const movieDetails = (state={}, action)=>{
    switch(action.type){
        case 'SET_DETAILS':
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
        movieToAdd,
        movieDetails
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
