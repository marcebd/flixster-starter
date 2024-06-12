import React from 'react';

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <div className="LoadMore">
      <button className="LoadMoreButton" onClick={onLoadMore}>Load More</button>
    </div>
  );
}

export default LoadMoreButton;
