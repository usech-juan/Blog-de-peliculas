import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import './App.css';

function BlogList() {
  const API_URL = 'https://online-movie-database.p.rapidapi.com';
  const API_KEY = '1d9eaf0c24msh738a94125ae0308p13cabfjsn31e797ef476c';
  const IMG_PATH = 'https://www.imdb.com/title/tt4633694/mediaviewer/rm173371392/?ref_=tt_ov_i';
  const URL_IMAGE = 'https://www.imdb.com/title/tt4633694/mediaviewer/rm173371392/?ref_=tt_ov_i';

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [movie, setMovie] = useState({ title: 'Loading Movie' });

  const fetchMovies = async (searchKey) => {
    const response = await fetch(`${API_URL}/auto-complete?q=${searchKey}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    });
    const { data } = await response.json();
    setMovies(data);
    setMovie(data[0]);
  };

  useEffect(() => {
    fetchMovies(searchKey);
  }, [searchKey]);

  return (
    <div>
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className='col-md-4 mb-3'>
              <img
                src={`${URL_IMAGE + movie.image}`}
                alt=''
                height='90%'
                width='100%'
              />
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { BlogList };
