// export default function Albuns(): JSX.Element {
//     return <h1 className="text-white">Lista de Álbuns</h1>;
//   }



  
import React from "react";
import ArtistItem from "../components/ArtistItem";
// import ArtistItem from "./ArtistItem";
// import { PlusCircle } from "phosphor-react";

export default function Albuns() {
    return (
        <div className="min-w-full flex flex-col">
        <div className="flex justify-between items-center mt-12">
          <h1 className="text-3xl text-paragraph font-bold">Albuns</h1>
          <button
            className="bg-slate-50 hover:bg-slate-600 hover:text-paragraph cursor-pointer transition-colors p-3
            rounded-full h-12 flex items-center"
            // onClick={() => handleModal(true)}
          >
            {/* <PlusCircle size={25} className="mr-1" /> */}
            Cadastrar artista
          </button>
        </div>
        <div className="w-full h-auto mt-4 grid grid-cols-1 gap-y-4">
        <ArtistItem name="João Gomes" country="Brasil"></ArtistItem>
        <ArtistItem name="Matuê" country="Brasil"></ArtistItem>
        <ArtistItem name="Bob Marley" country="Jamaica"></ArtistItem>
        <ArtistItem name="Joelma" country="Brasil"></ArtistItem>
        <ArtistItem name="Rodrigo Amarante" country="Brasil"></ArtistItem>
        </div>
      </div>
    )
}