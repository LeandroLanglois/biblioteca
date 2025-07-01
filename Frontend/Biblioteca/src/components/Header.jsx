import React from 'react'
import Favorite from './Favorite.jsx'

const Header = () => {
    return (
        <div>
            <header className="bg-blue-500 text-white p-4">
                <div className="flex items-center justify-between">
                    <img src="./logo.png" alt="Logo" className="h-10 w-10" />
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/sobre" className="hover:underline">Sobre</a></li>
                            <li><a href="/contato" className="hover:underline">Contato</a></li>
                            <li><a href="/favorito" className="hover:underline">Favoritos</a></li>

                        </ul>
                    </nav>
                    <h1 className="text-2xl font-bold">Biblioteca</h1>
                    <p className="text-sm">Gerencie seus livros favoritos</p>
                </div>
            </header>
        </div>
    )
}

export default Header