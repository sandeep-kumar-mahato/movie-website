import React, { useEffect, useState } from "react";
import axios from "axios";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";

const ShowDetails = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    movieName: "",
    genre: "",
    language: "",
    // Add more relevant details here
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${showId}`
        );
        setShow(response.data);
        setFormData({
          ...formData,
          movieName: response.data.name,
          genre: response.data.genres.join(", "),
          language: response.data.language,
          // Set more relevant details here
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowDetails();
  }, [formData, showId]);

  const stripHtmlTags = (htmlString) => {
    const strippedString = htmlString.replace(/(<([^>]+)>)/gi, "");
    return strippedString;
  };

  const handleBookTicket = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Store user details in local/session storage
    localStorage.setItem("userDetails", JSON.stringify(formData));
    // Reset form data
    setFormData({
      movieName: "",
      genre: "",
      language: "",
      // Reset more relevant details here
    });
    setIsModalOpen(false);

    // Redirect to UserDetailsPage
    navigate("/user-details"); // Use the navigate function to redirect
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  let ratingText = "";
  if (show.rating && show.rating.average) {
    ratingText = show.rating.average;
  } else {
    ratingText = "No rating";
  }

  return (
    <div className="container mx-auto lg:h-screen px-4 sm:px-8 lg:px-16 py-8 mt-16 bg-gray-900 text-white">
      <div className="flex flex-col sm:flex-row">
        <img
          src={show.image.original}
          alt={show.name}
          className="w-full lg:w-1/4 sm:w-1/2 sm:mr-4 mb-4 sm:mb-0 rounded-3xl"
        />
        <div>
          <h2 className="text-5xl font-bold mb-4">{show.name}</h2>
          <p className="text-gray-100 text-justify w-full lg:w-4/6 sm:w-full">
            {stripHtmlTags(show.summary)}
          </p>
          <p className="text-white text-3xl py-4">
            {ratingText}{" "}
            <FontAwesomeIcon icon={faStar} className="mr-3 text-yellow-500" />
          </p>
          <p className="text-gray-100 text-justify w-full lg:w-4/6 sm:w-full">
            Language: <span className="text-slate-400">{show.language}</span>
          </p>
          <p className="text-gray-100 text-justify w-full lg:w-4/6 sm:w-full">
            Genres:{" "}
            <span className="text-slate-400">{show.genres.join(", ")}</span>
          </p>
          <p className="text-gray-100 text-justify w-full lg:w-4/6 sm:w-full">
            Premiered: <span className="text-slate-400">{show.premiered}</span>
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleBookTicket}
          >
            Book Ticket
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg text-slate-950 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 relative">
            <h2 className="text-2xl font-bold mb-4">Book Ticket</h2>
            <form onSubmit={handleFormSubmit}>
              <button
                className="absolute top-4 right-6 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Movie Name:
                </label>
                <input
                  type="text"
                  name="movieName"
                  value={formData.movieName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Genre:
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Language:
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  disabled
                />
              </div>
              {/* Add more form fields for relevant details */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
