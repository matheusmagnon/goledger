import logo from '../../../public/images/logo.png'
import Image from 'next/image';
import { NavLink } from './menu/NavLink'
import React from 'react';

export function Header() {
    return (
        <header className="h-fit flex flex-row justify-between items-center w-full bg-white rounded-full px-4 "
        style={{ boxShadow: '-1px -1px 4px 1px rgba(255, 255, 255, 0.5)' }}>
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