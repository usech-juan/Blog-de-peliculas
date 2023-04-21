import React, { useState, useEffect } from 'react';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1d9eaf0c24msh738a94125ae0308p13cabfjsn31e797ef476c',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};

function BlogPost() {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  
  const searchMovies = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchKey}`, options);
    const data = await response.json();
    setMovies(data.d);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=avengers', options);
      const data = await response.json();
      setMovies(data.d);
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <br></br>
      <form className='container mb-4' onSubmit={searchMovies}>
        <input type="text" placeholder='search' onChange={(e)=> setSearchKey(e.target.value)}/>
        <button className='btn btn-primary'>Search</button>
      </form>
      <div className='container mt-3'>
        <div className="row">
          {movies.map((movie)=>(
            <div key={movie.id} className="col-md-4 mb-3">
              <img src={movie.i.imageUrl} alt="" height= "90%" width="100%" />
              <h4 className='text-center'>{movie.l}</h4> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export {BlogPost};
