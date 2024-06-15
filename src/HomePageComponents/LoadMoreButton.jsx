// Import React from the react library
import React from 'react';

// Define the LoadMoreButton component with a destructured onLoadMore prop
const LoadMoreButton = ({ onLoadMore }) => {
  // Render the LoadMoreButton component
  return (
    <div className="LoadMore">
      <button className="LoadMoreButton" onClick={onLoadMore}>Load More</button>
    </div>
  );
}

// Export the LoadMoreButton component as the default export of this module
export default LoadMoreButton;
