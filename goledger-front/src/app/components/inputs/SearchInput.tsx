'use client';

import React, { useState, useEffect } from 'react';

interface Item {
  name: string; 
  '@key': string; 
}

interface SearchInputProps {
  items: Item[];
  placeholder?: string;
  onSelect?: (item: Item) => void;
  resetQuery?: boolean; 
}

export default function SearchInput({
  items,
  placeholder = 'Digite para buscar...',
  onSelect,
  resetQuery = false,
}: SearchInputProps) {
  const [query, setQuery] = useState(''); 
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setFilteredItems([]); 
      return;
    }

    const filtered = items.filter((item) =>
      item?.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  
  const handleInputFocus = () => {
    setFilteredItems(items); 
  };

  useEffect(() => {
    if (resetQuery) {
      setQuery(''); 
    }
  }, [resetQuery]); 

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Sugestões */}
      {(filteredItems.length > 0 || query) && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onSelect?.(item); 
                setQuery(item.name); 
                setFilteredItems([]);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
