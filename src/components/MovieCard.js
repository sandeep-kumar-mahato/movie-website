import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  let ratingText = "";
  if (movie.rating && movie.rating.average) {
    ratingText = movie.rating.average;
  } else {
    ratingText = "No rating";
  }

  return (
    <Link
      to={`/shows/${movie.id}`}
      className="w-4/5 m-auto h-5/6 text-gray-50 rounded-lg shadow-slate-800 shadow-md overflow-hidden relative"
    >
      <img
        src={movie.image.original}
        alt={movie.name}
        className="w-full h-auto opacity-75 pb-12"
      />
      <div className="absolute -bottom-2 w-full">
        <div className="bg-opacity-75 backdrop-filter backdrop-blur flex justify-between p-4">
          <h2 className="text-xl font-bold mb-2 text-white">{movie.name}</h2>
          <p className="text-white">
            {ratingText}{" "}
            <FontAwesomeIcon icon={faStar} className="ml-1 text-yellow-500" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
