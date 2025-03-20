import React from "react"; // ✅ Required for functional components
import { useEffect, useState } from "react";
import { fetchRelationships } from "../api/api";

const Relationships = () => {
  const [relationships, setRelationships] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // ✅ Get logged-in user

  useEffect(() => {
    const loadRelationships = async () => {
      try {
        if (loggedInUser) {
          const userRelationships = await fetchRelationships(loggedInUser.id);
          setRelationships(userRelationships);
        }
      } catch (error) {
        console.error("Error fetching relationships:", error);
      }
    };

    loadRelationships();
  }, []);

  return (
    <div>
      <h2>Your Relationships</h2>
      {relationships.length === 0 ? (
        <p>No relationships found.</p>
      ) : (
        <ul>
          {relationships.map((relationship) => (
            <li key={relationship.id}>
              {relationship.type} - {relationship.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Relationships;
