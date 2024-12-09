import * as Dialog from '@radix-ui/react-dialog';
import { FloppyDisk, CircleNotch } from "phosphor-react";
import MultiSelect from "../components/inputs/MultiSelect";
import { ItemToSelect } from '@/types/global';
import { useStreamingContext } from '@/context/StreamingContext'; // Acesso ao contexto
import { useState } from 'react';
import { toast } from 'sonner';

interface EditPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    playlistId: string;
    songsToSelection: ItemToSelect[];
    songsOfPlaylist?: ItemToSelect[] | undefined;
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({ isOpen, onClose, playlistId, songsToSelection, songsOfPlaylist }) => {
    const [selectedSongs, setSelectedSongs] = useState<ItemToSelect[]>([]);
    const [playlistIsPrivate, setPlaylistIsPrivate] = useState<boolean | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const { editPlaylist } = useStreamingContext(); // Acesso ao contexto de streaming

    // Função para salvar as mudanças da playlist
    const handleSave = async () => {
        if (selectedSongs.length > 0) {
            setLoading(true);
            const combinedSongs = [...(selectedSongs || []), ...(songsOfPlaylist || [])];
            editPlaylist({ '@key': playlistId, isPrivate: playlistIsPrivate, songs: combinedSongs });
            setLoading(false);
        } else {
            toast.error('Selecione uma música para adicionar à Playlist!', {
                position: 'top-right',
            });
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Trigger />
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-200" /> 
            <Dialog.Content className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-96 p-6 bg-white rounded-lg shadow-xl z-[9999]">
                <Dialog.Close
                    className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-2"
                    onClick={onClose} 
                >
                    ×
                </Dialog.Close>
                <Dialog.Title className="text-2xl font-bold">Editar Playlist</Dialog.Title>
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Deseja que a playlist seja privada?</label>
                    <div className="flex gap-4 my-2 ">
                        <label>
                            <input
                                className='mr-1'
                                type="radio"
                                name="privacy"
                                checked={playlistIsPrivate === true}
                                onChange={() => setPlaylistIsPrivate(true)}
                            />
                            Privada
                        </label>
                        <label>
                            <input
                                className='mr-1'
                                type="radio"
                                name="privacy"
                                checked={playlistIsPrivate === false}
                                onChange={() => setPlaylistIsPrivate(false)}
                            />
                            Pública
                        </label>
                    </div>
                    <label className="block text-sm font-semibold">Digite a música que deseja adicionar</label>
                    <MultiSelect
                        items={songsToSelection}
                        onSelectionChange={(selected) => setSelectedSongs(selected)}
                        resetSelection={selectedSongs === undefined}
                        selected={selectedSongs}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-colors p-3 
                                rounded-full h-12 flex items-center font-medium"
                    >
                        {loading ? <CircleNotch size={20} className="animate-spin" weight='bold' color='white' /> : <FloppyDisk size={20} weight='bold' color='white' />}
                        <span className="text-paragraph">Salvar</span>
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default EditPlaylistModal;
