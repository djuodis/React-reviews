import { TiStarFullOutline } from "react-icons/ti";
import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle, IoMdTrash } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const ReviewsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );

    fetch(`http://localhost:4000/reviews?productId=${productId}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [productId]);

  const deleteReview = (reviewId) => {
    fetch(`http://localhost:4000/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{product.title} Reviews:</h1>

      <main>
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <p className="name">
              {review.author}
              {review.verified === "False" && (
                <IoIosCheckmarkCircle style={{ color: "grey" }} />
              )}
              {review.verified === "True" && (
                <IoIosCheckmarkCircle style={{ color: "#0fa5af" }} />
              )}
            </p>
            <p className="rating">
              Rating:{" "}
              {Array.from({ length: 5 }, (_, i) => (
                <TiStarFullOutline
                  key={i}
                  style={{ color: i < review.rating ? "#0fa5af" : "grey" }}
                />
              ))}
            </p>
            <h3 className="reviewTitle">{review.title}</h3>
            <p className="review">{review.comment}</p>

            <button onClick={() => deleteReview(review.id)}>
              <IoMdTrash style={{ color: "red", fontSize: 24 }} />
            </button>
          </div>
        ))}
      </main>

      <Link to="/">Go Back</Link>
    </>
  );
};

export default ReviewsPage;
