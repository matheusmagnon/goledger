'use client';

import { FloppyDisk, CircleNotch } from "phosphor-react"; 
import SearchInput from "../components/inputs/SearchInput";
import { useEffect, useState } from "react";
import { useStreamingContext } from "@/context/StreamingContext";
import { toast } from "sonner";
import * as Dialog from '@radix-ui/react-dialog';
import ListContainer from "../components/ListContainer";
import AlbumItem from "./AlbumItem";
import Skeleton from "../components/Skeleton";

export default function Albums() {
  const { albums, addAlbum, fetchAlbum, artists, fetchArtists } = useStreamingContext();
  const [name, setName] = useState<string>('');
  const [artistsSelected, setArtistsSelected] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [resetQuery, setResetQuery] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [isLoadingComponents, setIsLoadingComponents] = useState<boolean>(true); 
  const artistsToSelection = (artists || []).map((artist) => {
    return {
      name: artist.name,
      '@key': artist['@key']
    }
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    const loadAlbums = async () => {
      setIsLoadingComponents(true);
      await fetchAlbum(); 
      setIsLoadingComponents(false); 
    };
    loadAlbums(); 
  }, []);
  const handleCreateAlbum = async () => {
    if (name && country) {
      setIsLoading(true); 
      await addAlbum(name, country, artistsSelected);
      setName(''); 
      setCountry(''); 
      setArtistsSelected(''); 
      setResetQuery(true); 
      setIsLoading(false); 
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="min-w-full flex flex-col">
      <div className="flex justify-between items-center mt-12 px-4">
        <h1 className="text-3xl text-paragraph font-bold">Álbuns</h1>
        <Dialog.Root>
          <Dialog.Trigger
            className="bg-slate-50 hover:bg-slate-600 hover:text-paragraph cursor-pointer 
                      transition-colors p-3 rounded-full h-12 flex items-center font-semibold"
          >
            Cadastrar Álbum
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
          <Dialog.Content className="fixed top-10 left-1/2 transform -translate-x-1/2 w-96 p-6
                                 bg-white rounded-lg shadow-xl z-50">
            <Dialog.Title className="text-2xl font-bold">Insira os dados do Álbum</Dialog.Title>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Nome do álbum"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Ano:</label>
              <input
                type="number"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Ano do álbum"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">Nome do artista:</label>
              <SearchInput
                items={artistsToSelection}
                placeholder="Digite o nome do artista..."
                onSelect={(selected) => setArtistsSelected(selected['@key'])}
                resetQuery={resetQuery} 
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreateAlbum}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 
                          rounded-full h-12 flex items-center font-medium"
              >
                {isLoading ? (
                  <CircleNotch size={20} weight="bold" className="text-paragraph animate-spin" />
                ) : (
                  <FloppyDisk size={20} weight="bold" className="text-paragraph" />
                )}
                <span className="text-paragraph">{'Salvar'}</span>
              </button>
            </div>
            <Dialog.Close className="absolute top-2 right-2 text-xl cursor-pointer">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      {isLoadingComponents ? (
        <ListContainer direction="row">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index}/>
          ))}
        </ListContainer>
      ) : (
        <ListContainer direction="row">
          {albums?.map((album, index) => (
            <AlbumItem key={album['@key'] || index} name={album.name} year={album.year} id={album['@key']} />
          ))}
        </ListContainer>
      )}
    </div>
  );
}
