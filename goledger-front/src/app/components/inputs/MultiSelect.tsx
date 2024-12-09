'use client';

import { ItemToSelect } from '@/types/global';
import React, { useState, useEffect, useRef } from 'react';


interface MultiSelectProps {
  items: ItemToSelect[]; 
  placeholder?: string; 
  onSelectionChange?: (selectedItems: ItemToSelect[]) => void; 
  resetSelection?: boolean;
  selected?: ItemToSelect[]
}

export default function MultiSelect({
  items,
  placeholder = 'Digite o nome da música',
  onSelectionChange,
  resetSelection = false,
}: MultiSelectProps) {
  const [query, setQuery] = useState(''); 
  const [filteredItems, setFilteredItems] = useState<ItemToSelect[]>([]); 
  const [selectedItems, setSelectedItems] = useState<ItemToSelect[]>([]); 
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null); 


  useEffect(() => {
    if (resetSelection) {
      setSelectedItems([]);
      setQuery(''); 
      setFilteredItems([]); 
      setIsDropdownVisible(false);
    }
  }, [resetSelection]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  
    if (!value) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered); 
    }
  
    setIsDropdownVisible(true);
  };

  const handleInputFocus = () => {
    if (!query) {
      setFilteredItems(items); 
    }
    setIsDropdownVisible(true); 
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleItemSelection = (item: ItemToSelect) => {
    setSelectedItems((prevSelected) => {
      const isAlreadySelected = prevSelected.some((selected) => selected.name === item.name);

      if (isAlreadySelected) {
        return prevSelected.filter((selected) => selected.name !== item.name);
      }

      return [...prevSelected, item];
    });
  };

  useEffect(() => {
    onSelectionChange?.(selectedItems);
  }, [selectedItems, onSelectionChange]);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus} 
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      {isDropdownVisible && filteredItems.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredItems.map((item) => {
            const isSelected = selectedItems.some(
              (selected) => selected.name === item.name
            );

            return (
              <li
                key={item.name}
                className={`px-4 py-2 flex justify-between items-center hover:bg-blue-100 cursor-pointer ${isSelected ? 'bg-blue-50' : ''
                  }`}
                onClick={() => toggleItemSelection(item)}
              >
                <span>{item.name}</span>
                {isSelected && <span className="text-blue-500 font-bold">✔</span>}
              </li>
            );
          })}
        </ul>
      )}

      {selectedItems.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">
            {selectedItems.length === 1
              ? '1 música foi selecionada'
              : `${selectedItems.length} músicas foram selecionadas`}
          </h4>
        </div>
      )}
    </div>
  );
}
