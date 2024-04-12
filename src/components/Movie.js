import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => {
  const { addToFavorites, deleteMovie } = props;
  const [movie, setMovie] = useState({
    id: '', title: '', director: '', genre: '', metascore: '', description: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(() => {
        deleteMovie(id);
        navigate("/movies");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const handleFavorite = () => {
    addToFavorites(movie);
  };

  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{movie.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">
              <section className="movie-details">
                {/* Movie details */}
              </section>
              <section>
                <button onClick={handleFavorite} className="m-2 btn btn-dark">Favorite</button>
                <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                <button onClick={handleDelete} className="m-2 btn btn-danger">Delete</button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;