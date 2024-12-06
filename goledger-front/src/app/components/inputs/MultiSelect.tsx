'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Item {
  name: string; // Propriedade pelo qual será feita a busca
  [key: string]: unknown; // Outras propriedades opcionais
}

interface MultiSelectProps {
  items: Item[]; // Lista de itens para seleção
  placeholder?: string; // Placeholder do campo de busca
  onSelectionChange?: (selectedItems: Item[]) => void; // Callback para o componente pai
  resetSelection?: boolean;

}

export default function MultiSelect({
  items,
  placeholder = 'Digite para buscar...',
  onSelectionChange,
  resetSelection = false,
}: MultiSelectProps) {
  const [query, setQuery] = useState(''); // Texto digitado no campo de busca
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // Sugestões filtradas
  const [selectedItems, setSelectedItems] = useState<Item[]>([]); // Itens selecionados
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Visibilidade da lista de sugestões
  const containerRef = useRef<HTMLDivElement>(null); // Referência para o componente


  useEffect(() => {
    if (resetSelection) {
      setSelectedItems([]); // Reseta a seleção
    }
  }, [resetSelection]);
  
  // Atualiza o texto digitado e sugere itens
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setFilteredItems(items); // Mostra todos os itens ao limpar o campo
    } else {
      // Filtra os itens com base no nome
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }

    setIsDropdownVisible(true); // Mostra a lista
  };

  // Exibe todos os itens ao clicar no input, se a busca estiver vazia
  const handleInputFocus = () => {
    if (!query) {
      setFilteredItems(items); // Exibe todos os itens disponíveis
    }
    setIsDropdownVisible(true); // Mostra a lista
  };

  // Oculta a lista ao clicar fora
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsDropdownVisible(false);
    }
  };

  // Registra e remove o evento de clique fora
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Alterna a seleção de um item
  const toggleItemSelection = (item: Item) => {
    setSelectedItems((prevSelected) => {
      const isAlreadySelected = prevSelected.some((selected) => selected.name === item.name);

      // Remove o item se já estiver selecionado
      if (isAlreadySelected) {
        return prevSelected.filter((selected) => selected.name !== item.name);
      }

      // Caso contrário, adiciona o item
      return [...prevSelected, item];
    });
  };

  // Remove um item da lista de selecionados
  const removeSelectedItem = (item: Item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.filter((selected) => selected.name !== item.name)
    );
  };

  // Dispara o callback sempre que `selectedItems` mudar
  useEffect(() => {
    onSelectionChange?.(selectedItems);
  }, [selectedItems, onSelectionChange]);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={containerRef}>
      {/* Campo de entrada */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Mostra todos os itens ao focar no campo
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Lista de sugestões */}
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
                {/* Exibe o check se o item estiver selecionado */}
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
