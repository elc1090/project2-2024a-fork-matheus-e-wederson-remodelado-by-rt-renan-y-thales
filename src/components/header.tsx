'use client'

import { useState, useEffect } from 'react';
import { CartDropdown } from './cart-dropdown';
import { useCart } from '@/context/cart-context';

export function Header() {
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const { quantityInCart } = useCart();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toggleDropDown) {
        setToggleDropDown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleDropDown]);

  return (
    <header className="flex h-40 w-full items-center justify-around bg-zinc-800 px-4">
      <h1 className="font-mono text-3xl font-bold text-white text-center">Fraud Detection</h1>
      <div className="relative">
        <button
          onClick={() => setToggleDropDown(!toggleDropDown)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Carrinho ({quantityInCart === undefined ? "0" : quantityInCart})
        </button>
        {toggleDropDown ? (<CartDropdown />) : <></>}
      </div>
    </header>
  );
}
