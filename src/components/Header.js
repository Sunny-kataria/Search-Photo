import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = ({ searchQuery, setSearchQuery, handleSearchIconClick, suggestedQueries, handleSuggestionClick, clearSearch, handleKeyPress }) => {
  return (
    <header className="bg-gray-900 p-5 text-black fixed w-full z-10 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h1 className='text-white text-3xl'>Search Photos</h1>
        <div className="relative inline-block py-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search images..."
            className="p-2 pl-10 h-8 text-lg bg-gray-200 rounded-md w-80"
          />
          <FaSearch
            className="absolute right-3 top-5 text-gray-500 cursor-pointer"
            onClick={handleSearchIconClick}
          />

          {suggestedQueries.length > 0 && searchQuery && (
            <div className="suggested-queries absolute bg-white border border-gray-300 max-h-200 mt-2 w-full overflow-y-auto">
              {suggestedQueries
                .filter((query) => query && searchQuery && query.toLowerCase().startsWith(searchQuery.toLowerCase()))
                .slice(0, 2)
                .map((query, index) => (
                  <div
                    key={index}
                    className="suggested-query p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(query)}
                  >
                    {query}
                  </div>
                ))}
              {suggestedQueries.length > 2 && (
                <button
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={clearSearch}
                >
                  X
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
