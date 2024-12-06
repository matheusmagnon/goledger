'use client';

import { useEffect, useRef, useState } from "react";
import { NotePencil, Trash, FloppyDisk, XCircle } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext';

interface ArtistItemProps {
  name: string;
  year: string;
  id: string;
}

export default function AlbumItem({ name, year, id }: ArtistItemProps) {
  const { removeAlbum, fetchAlbum, editAlbum } = useStreamingContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newYear, setNewYear] = useState(year);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // Foca no campo
    }
  }, [isEditing]);

  // Função para atualizar o artista
  const handleSave = async () => {
    console.log('id', id)
    console.log('year', newYear)
    editAlbum(id, year = newYear)
    setIsEditing(false);
    fetchAlbum();
  };

  // Função para ativar o modo de edição
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Função para excluir o artista
  const handleDelete = async () => {
    removeAlbum(id);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
      <div className="w-full h-auto bg-white rounded-lg p-2 px-2 flex items-center hover:bg-gray-100 transition-colors">
        <div className="w-full flex justify-between items-center ">
          <div className="flex flex-col items-center">
            <p className="text-customBg text-xl font-bold">{name}</p>
          </div>
          <div className="flex items-center justify-between gap-20">
            <div className="flex flex-col items-center">
              {isEditing ? (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="text-customBg text-xl font-medium border-4 border-slate-500 p-2 rounded-xl"
                  />
                </>
              ) : (
                <p className="text-customBg text-xl font-bold">{year}</p>
              )}
            </div>
            <div className="flex justify-between gap-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 
                            rounded-full h-12 flex items-center font-medium"
                ><FloppyDisk size={20} className="text-paragraph" />
                  <span className="text-paragraph">Salvar</span>
                </button>
              ) : (<button
                onClick={handleEdit}
                className="gap-2 bg-slate-600 hover:bg-slate-700 cursor-pointer transition-colors p-3 
                              rounded-full h-12 flex items-center font-medium">
                <NotePencil className="text-paragraph" size={20} />
                <span className="text-paragraph">Editar</span>
              </button>)}

              {isEditing ? (
                <button
                  onClick={handleCancel}
                  className="gap-2 bg-slate-600 hover:bg-slate-700 cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
                >
                  <XCircle className="text-paragraph" size={20} />
                  <span className="text-paragraph">Cancelar</span>
                </button>
              ) : (
                <button
                  onClick={handleDelete}
                  className="gap-2 bg-slate-600 hover:bg-slate-500 hover:text-paragraph cursor-pointer transition-colors p-3 rounded-full h-12 flex items-center font-medium"
                >
                  <Trash className="text-paragraph" size={20} />
                  <span className="text-paragraph">Excluir</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
