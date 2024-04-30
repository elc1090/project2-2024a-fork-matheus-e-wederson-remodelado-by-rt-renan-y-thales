"use client";

import { useCart } from "@/context/cart-context";

export function CartDropdown() {
  const { quantityInCart, cart } = useCart();

  return (
    <>
      <div className="dropdown absolute right-0 mt-2 w-48 rounded border border-gray-300 bg-white shadow-lg">
        {quantityInCart === 0 || cart === undefined ? (
          <p className="px-4 py-2 text-gray-800">Carrinho vazio</p>
        ) : (
          cart.map((item) => (
            <p
              key={item.id}
              className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              {item.title} - ${item.price}
            </p>
          ))
        )}
      </div>
    </>
  );
}
