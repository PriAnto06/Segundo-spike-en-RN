import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Contenedor from "../../components/Contenedor";
import TituloDeLaPagina from "../../components/TituloDeLaPagina";
import FormularioParaItemNuevo from "../../components/FormularioParaItemNuevo";
import ListaDeCompras from "../../components/ListaDeCompras";
import { Item } from "../../tipos/item";
import useItemsDeCompra from "@/hooks/usarItemsDeCompra";


export default function App() {


  const { items, agregarItem, cambiarItem, eliminarItem } = useItemsDeCompra();

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