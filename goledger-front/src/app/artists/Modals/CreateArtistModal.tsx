'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { FloppyDisk, PlusCircle } from 'phosphor-react';
import { useStreamingContext } from '../../../context/StreamingContext';

export default function CreateArtistModal() {
  const { addArtist } = useStreamingContext();
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const handleCreateArtist = () => {
    if (name && country) {
      addArtist(name, country);
      setName('');
      setCountry('');
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger title="Clique para adicionar uma artista" className="hover:bg-emerald-600 text-white p-1 ml-2 mb-4 rounded-lg">
        <span className="flex items-center">
        <PlusCircle size={30} weight='bold' />
        </span>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
      <Dialog.Content className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-96 p-6 bg-white rounded-lg shadow-xl z-50">
        <Dialog.Title className="text-2xl font-bold">Cadastrar Artista</Dialog.Title>
        <div className="mt-4">
          <label className="block text-sm font-semibold">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Nome do artista"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold">País:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="País do artista"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCreateArtist}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
          >
            <FloppyDisk size={20} className="text-paragraph" />
            <span className="text-paragraph">Salvar</span>
          </button>
        </div>
        <Dialog.Close className="absolute top-2 right-2 text-xl cursor-pointer">×</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
