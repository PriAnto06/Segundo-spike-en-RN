import Contenedor from "../../components/Contenedor";
import TituloDeLaPagina from "../../components/TituloDeLaPagina";
import FormularioParaItemNuevo from "../../components/FormularioParaItemNuevo";
import ListaDeCompras from "../../components/ListaDeCompras";
import useItemsDeCompra from "@/hooks/usarItemsDeCompra";

export default function App() {
  const { items, agregarItem, cambiarItem, eliminarItem } = useItemsDeCompra();

  return (
    <Contenedor>
      <TituloDeLaPagina />

      <ListaDeCompras
        items={items}
        alPresionarSobreUnItem={cambiarItem}
        alMantenerPresionSobreUnItem={eliminarItem}
      />

      <FormularioParaItemNuevo alCompletarFormulario={agregarItem} />
    </Contenedor>
  );
}
