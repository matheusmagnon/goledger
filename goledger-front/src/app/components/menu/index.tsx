import logo from '../../../../public/images/logo.png'
import Image from 'next/image';
import { NavLink } from './NavLink'
import React from 'react';

export function Menu() {
    return (
        <div className="flex justify-between items-center w-full lg:w-4/6 bg-white rounded-full px-6 shadow-md m-auto max-w-[1200px]"
            >
            <Image
                className="lg:h-14 h-10 object-contain"
                src={logo}
                alt="Logo"
                width={150}
                height={150}
            />
            <NavLink text="Artistas" href="/artists" />
            <NavLink text="Álbuns" href="/albums" />
            <NavLink text="Músicas" href="/songs" />
            <NavLink text="Playlists" href="/playlists" />
        </div>
    )
}