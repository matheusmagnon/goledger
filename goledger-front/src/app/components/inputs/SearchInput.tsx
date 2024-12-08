'use client';

import React, { useState, useEffect } from 'react';

interface Item {
  name: string; // Propriedade pelo qual será feita a busca
  '@key': string; // Outras propriedades opcionais
}

interface SearchInputProps {
  items: Item[]; // Array de objetos para pesquisa
  placeholder?: string; // Placeholder opcional
  onSelect?: (item: Item) => void; // Callback ao selecionar um item
  resetQuery?: boolean; // Novo prop para controlar o reset do campo
}

export default function SearchInput({
  items,
  placeholder = 'Digite para buscar...',
  onSelect,
  resetQuery = false,
}: SearchInputProps) {
  const [query, setQuery] = useState(''); // Estado para armazenar o texto digitado
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // Estado para armazenar as sugestões filtradas

  // Função para lidar com a entrada do usuário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setFilteredItems([]); // Limpa as sugestões se o campo estiver vazio
      return;
    }

    // Filtra os itens com base no nome
    const filtered = items.filter((item) =>
      item?.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Função para mostrar todos os itens ao clicar no input
  const handleInputFocus = () => {
    if (!query) {
      setFilteredItems(items); // Mostra todos os itens quando o input ganha foco
    }
  };

  // Resetando o query quando o resetQuery mudar para true
  useEffect(() => {
    if (resetQuery) {
      setQuery(''); // Limpa o campo
    }
  }, [resetQuery]); // Observa a mudança no resetQuery

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Sugestões */}
      {filteredItems.length > 0 && query && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onSelect?.(item); // Chama o callback ao selecionar
                setQuery(item.name); // Atualiza o campo com o valor selecionado
                setFilteredItems([]); // Limpa as sugestões após a seleção
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
