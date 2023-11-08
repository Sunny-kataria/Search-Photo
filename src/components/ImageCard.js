

import React from 'react';

const ImageCard = ({ id, title, url, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer hover:bg-gray-200" onClick={() => onClick(id)}>
      <img className="w-full" src={url} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};

export default ImageCard;






