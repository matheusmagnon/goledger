import * as Dialog from '@radix-ui/react-dialog';
import { FloppyDisk, CircleNotch } from "phosphor-react";
import { useStreamingContext } from '@/context/StreamingContext'; 
import { useState } from 'react';
import { toast } from 'sonner';

interface EditPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    artistName: string;
    artistId: string;
}

const EditArtistModal: React.FC<EditPlaylistModalProps> = ({ isOpen, onClose, artistName, artistId }) => {
    const [newCountry, setNewCountry] = useState('');
    const [loading, setLoading] = useState(false);

    const { editArtist } = useStreamingContext(); 

    const handleSave = async () => {
        if(newCountry){
        setLoading(true);
        await editArtist({ '@key': artistId, country: newCountry });
        setNewCountry('');
        setLoading(false);
        }else{
            toast.error("Digite o novo país do artista", {
                position: "top-right",
                duration: 3000,
                style: {
                    backgroundColor: "#f4eded",
                    color: "#515151",
                    border: "1px solid #515151",
                    fontSize: "16px",
                    fontWeight: "bold",
                },
                className: "custom-toast",
            })
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
                <Dialog.Title className="text-2xl font-bold">Edição de país</Dialog.Title>
                <div className="mt-4">
                    <label className="block text-sm font-semibold">{`Digite o novo país para o artista ${`${artistName}`}`} ?</label>
                    <div className="flex gap-4 my-2 ">
                        <label>
                            <input
                                type="text"
                                value={newCountry}
                                onChange={(e) => setNewCountry(e.target.value)}
                                className="border-2 border-gray-300 p-1 rounded-md w-full "
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-start">
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

export default EditArtistModal;
