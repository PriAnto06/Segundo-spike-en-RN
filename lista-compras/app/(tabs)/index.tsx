import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Contenedor from "../../components/Contenedor";
import TituloDeLaPagina from "../../components/TituloDeLaPagina";
import FormularioParaItemNuevo from "../../components/FormularioParaItemNuevo";
import ListaDeCompras from "../../components/ListaDeCompras";
import { Item } from "../../tipos/item";

// 🔹 Hook definido en el mismo archivo
function usarItemsDeCompra() {
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

// 🔹 Componente principal
export default function App() {
  // ✅ Usamos el hook **dentro del componente**
  const { items, agregarItem, cambiarItem, eliminarItem } = usarItemsDeCompra();

  return (
    <Contenedor>
      <TituloDeLaPagina />

      <View style={styles.listaContainer}>
        <ListaDeCompras
          items={items}
          alPresionarSobreUnItem={cambiarItem}
          alMantenerPresionSobreUnItem={eliminarItem}
        />
      </View>

      <FormularioParaItemNuevo alCompletarFormulario={agregarItem} />
    </Contenedor>
  );
}

const styles = StyleSheet.create({
  listaContainer: {
    flex: 1,
    minHeight: 200, // asegura que haya espacio aunque la lista esté vacía
  },
});