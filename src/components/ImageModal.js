import React from 'react';

const ImageModal = ({ url, title, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-75"></div>

      <div className="modal-container bg-white w-5/6 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <button onClick={onClose} className="modal-close">
              <span className="text-3xl">×</span>
            </button>
          </div>
          <img src={url} alt={title} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
