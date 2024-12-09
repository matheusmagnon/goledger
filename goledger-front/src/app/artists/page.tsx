'use client';

import React, { useState, useEffect } from 'react';
import ArtistItem from './ArtistItem';
import { useStreamingContext } from '../../context/StreamingContext';
import ListContainer from '../components/ListContainer';
import CreateArtistModal from './Modals/CreateArtistModal';
import ArtistAlbum from './ArtistsAlbum';

export default function Artists() {
  const { artists, fetchArtists } = useStreamingContext();
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    if (artists.length > 0 && !selectedArtist) {
      setSelectedArtist(artists[0]['@key']);
    }
  }, [artists, selectedArtist]);

  const handleSelectArtist = (artistId: string) => {
    setSelectedArtist(artistId);
  };

  const selectedArtistData = artists.find((artist) => artist['@key'] === selectedArtist);

  return (
    <div className="mt-14">
      <div className="flex items-center">
        <h1 className="text-3xl text-paragraph font-bold mb-4">Artistas</h1>
        <CreateArtistModal />
      </div>

      <div className="flex h-screen gap-4">
        <div className="w-1/3 bg-gray-900 overflow-y-auto rounded-xl">
          <ListContainer direction="col">
            {artists.map((artist, index) => (
              <div
                key={artist['@key'] || `playlist-${index}`}
                onClick={() => handleSelectArtist(artist['@key'])}
                className={`rounded-lg cursor-pointer text-red-900 ${
                  selectedArtist === artist['@key'] ? 'bg-gray-700' : 'bg-gray-800'
                }`}
              >
                <ArtistItem
                  key={artist['@key'] || index}
                  name={artist.name}
                  country={artist.country}
                  id={artist['@key']}
                />
              </div>
            ))}
          </ListContainer>
        </div>
        {selectedArtistData && (
          <ArtistAlbum
            albums={selectedArtistData.albums}
            artistName={selectedArtistData.name}
            artistCountry={selectedArtistData.country}
            artistId={selectedArtistData['@key']}
          />
        )}
      </div>
    </div>
  );
}
