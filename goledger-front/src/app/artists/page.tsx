'use client';

import React, { useState, useEffect } from 'react';
import ArtistItem from './ArtistItem';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { useStreamingContext } from '../../context/StreamingContext';
import ListContainer from '../components/ListContainer';
import { FloppyDisk } from 'phosphor-react';

// const Loading = () => <div className='text-white'>Carregando...</div>;

// const ErrorMessage = ({ message }: { message: string }) => <div>{message}</div>;

export default function Artists() {
  const { artists, addArtist, fetchArtists } = useStreamingContext();
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    fetchArtists();
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez, após a renderização inicial'


  // if (isLoading) return <Loading />;
  // if (error) return <ErrorMessage message={error} />;

  // Function to handle artist creation
  const handleCreateArtist = () => {
    if (name && country) {
      addArtist(name, country); // Adiciona o novo artista
      setName(''); // Limpa o campo de nome
      setCountry(''); // Limpa o campo de país
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="min-w-full flex flex-col">
      <div className="flex justify-between items-center mt-12">
        <h1 className="text-3xl text-paragraph font-bold">Artistas</h1>
        <Dialog.Root>
          <Dialog.Trigger
            className="bg-slate-50 hover:bg-slate-600 hover:text-paragraph cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-semibold"
          >
            Cadastrar artista
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
              ><FloppyDisk size={20} className="text-paragraph" />
                <span className="text-paragraph">Salvar</span>
              </button>
            </div>
            <Dialog.Close className="absolute top-2 right-2 text-xl cursor-pointer">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <ListContainer>
        {artists?.map((artist) => (
          <ArtistItem key={artist['@key']} name={artist.name} country={artist.country} id={artist['@key']} />
        ))
        }
      </ListContainer>
    </div>
  );
}