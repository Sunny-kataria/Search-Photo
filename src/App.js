import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './components/ImageCard';
import ImageModal from './components/ImageModal';
import {  FaSpinner  } from 'react-icons/fa';
import Header from './components/header';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestedQueries, setSuggestedQueries] = useState([]);

  const fetchImages = async (query = '', pageNum) => {
    try {
      setLoading(true);

      let params;
      if (query === '') {
        params = {
          method: 'flickr.photos.getRecent',
          api_key: '8d363e31073ce8123ba2db1e0aff42b4',
          format: 'json',
          nojsoncallback: 1,
          page: pageNum,
          per_page: 10,
          safe_search: 1,
        };
      } else {
        params = {
          method: 'flickr.photos.search',
          api_key: '8d363e31073ce8123ba2db1e0aff42b4',
          format: 'json',
          nojsoncallback: 1,
          text: query,
          page: pageNum,
          per_page: 10,
          safe_search: 1,
        };
      }

      const response = await axios.get(`https://www.flickr.com/services/rest/`, { params });

      if (response.data.photos && response.data.photos.photo) {
        const photos = response.data.photos.photo.map((photo) => ({
          id: photo.id,
          title: photo.title,
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        }));

        photos.sort((a, b) => a.title.localeCompare(b.title));

        setResults((prevResults) => [...prevResults, ...photos]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setResults([]);
    fetchImages(searchQuery, 1);
    saveSuggestedQuery(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleImageClick = (id) => {
    const selected = results.find(photo => photo.id === id);
    setSelectedImage(selected);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const handleSearchIconClick = () => {
    handleSearch(); // Call the handleSearch function when the search icon is clicked
  };

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    setPage(1);
    setResults([]);
    fetchImages(query, 1);
  };

  const clearSearch = () => {
    setSuggestedQueries([]);
  };

  const saveSuggestedQuery = (query) => {
    const savedQueries = JSON.parse(localStorage.getItem('suggestedQueries')) || [];
    if (!savedQueries.includes(query)) {
      const updatedQueries = [query, ...savedQueries];
      localStorage.setItem('suggestedQueries', JSON.stringify(updatedQueries));
      setSuggestedQueries(updatedQueries);
    }
  };

  useEffect(() => {
    const savedQueries = JSON.parse(localStorage.getItem('suggestedQueries')) || [];
    setSuggestedQueries(savedQueries);
  }, []);

  useEffect(() => {
    fetchImages(searchQuery, page);
  }, [page, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        const nextPage = page + 1;
        fetchImages(searchQuery, nextPage);
        setPage(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, searchQuery]);

  return (

    //Header ...
    <div className="font-family-Arial">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchIconClick={handleSearchIconClick}
        suggestedQueries={suggestedQueries}
        handleSuggestionClick={handleSuggestionClick}
        clearSearch={clearSearch}
        handleKeyPress={handleKeyPress}
      />
      

      {/* Image shows ....*/}

      <div className="pt-32 top-2/3 flex flex-wrap justify-center">
        {results.length > 0 ? (
          results.map((photo) => (
            <ImageCard
              key={photo.id}
              id={photo.id}
              title={photo.title}
              url={photo.url}
              onClick={handleImageClick}
            />
          ))
        ) : (
          <div className="flex items-center text-6xl justify-center h-screen">No images found</div>
        )}
      </div>
      
      
      {/* Defining Loader using react -icons.... */}

      <div className="flex items-center justify-center h-screen">
      {loading && <FaSpinner className="text-6xl animate-spin" />}
    </div>



    {/* Logic for showing a sinle photo.....  */}

      {selectedImage && (
        <ImageModal
          url={selectedImage.url}
          title={selectedImage.title}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;



