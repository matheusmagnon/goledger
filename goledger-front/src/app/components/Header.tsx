import logo from '../../../public/images/logo.png'
import Image from 'next/image';
import { NavLink } from './menu/NavLink'
import React from 'react';

export function Header() {
    return (
        <header className="h-fit flex flex-row justify-between items-center w-full bg-white rounded-full px-6 py-2">
            <Image
            className="lg:h-16 h-10 object-contain"
            src={logo}
            alt="Logo"
            width={200}
            height={100}
      />
            <NavLink text="Artistas" href="/artists" />
            <NavLink text="Álbuns" href="/albums" />
            <NavLink text="Músicas" href="/songs" />
            <NavLink text="Playlists" href="/playlists" />
        </header>
    )
}