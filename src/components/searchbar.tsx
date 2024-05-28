"use client";

import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search"
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  );
};

export default SearchBar;
