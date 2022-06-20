import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

import "./PhotoDetails.css"

const PhotoDetails = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [hasError, setError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get(`/photos/${id}?client_id=${process.env.REACT_APP_API_KEY}&orientation=squarish`);
        setResult(res.data)
      } catch (error) {
        setError(true)
      }
    }
    fetchPhoto();
  }, [id]);

    return (
        <div className="container">
          {hasError && <p>An error has occurred</p>}
          {/* <a href={result.links.html}> */}
          {result && <img className="photoItem" src={result.urls.regular} alt="Gallery Pictures" />}<br/>
          {/* </a> */}
          {/* <p>Created: {result.created_at}</p>
          <p>Downloads: {result.downloads}</p>
          <p>City: {result.location.city} | Country: {result.location.country}</p> */}
          <div className="btn from-top" onClick={() => {navigate("/")}}>Back</div>
        </div>
  );
}

export default PhotoDetails;