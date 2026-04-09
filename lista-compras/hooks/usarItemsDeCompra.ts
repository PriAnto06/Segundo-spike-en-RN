import { useState } from "react";
import { Item } from "../tipos/item";

export default function usarItemsDeCompra() {
  const [items, setItems] = useState<Item[]>([]);

  const agregarItem = (name: string) => {
    if (!name.trim()) return;
    const nuevoItem: Item = {
      id: Date.now().toString(),
      name,
      done: false,
    };
    setItems(prev => [...prev, nuevoItem]);
  };

  const cambiarItem = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const eliminarItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return { items, agregarItem, cambiarItem, eliminarItem };
}