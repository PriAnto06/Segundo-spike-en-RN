import { ReactNode, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Item = {
  id: string;
  name: string;
  done: boolean;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");

  const añadirItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), name: trimmed, done: false },
    ]);
    setText("");
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  };

  const eliminarItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const TarejetaParaItemDeCompra = ({ item }: { item: Item }) => (
    <Pressable
      onPress={() => toggleItem(item.id)}
      onLongPress={() => eliminarItem(item.id)}
      style={styles.row}
    >
      <Text style={[styles.rowText, item.done && styles.done]}>
        {item.name}
      </Text>

      <Text
        style={[styles.pill, item.done ? styles.pillDone : styles.pillTodo]}
      >
        {item.done ? "✔" : "•"}
      </Text>
    </Pressable>
  );

  return (
    <Contenedor>
      <TituloDeLaPagina />
      <ListaDeCompras
  items={items}
  componenteParaCadaItem={TarejetaParaItemDeCompra}
/>
    <FormularioParaItemNuevo
     texto={text}
      alIntroducirTexto={setText}
     alAgregarItem={añadirItem} 
          />
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Agregar producto (ej: Leche)"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={añadirItem}
        />

        <Pressable style={styles.addBtn} onPress={añadirItem}>
          <Text style={styles.addTxt}>Agregar</Text>
        </Pressable>
      </View>
    </Contenedor>
  );
}

const Contenedor = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const TituloDeLaPagina = () => {
  return <View style={styles.title}></View>;
};

const FormularioParaItemNuevo = ({
  texto,
  alIntroducirTexto,
  alAgregarItem,
}: {
  texto: string;
  alIntroducirTexto: (texto: string) => void;
  alAgregarItem: () => void;
}) => {
  return (
    <View style={styles.inputRow}>
      <TextInput
        value={texto}
        onChangeText={alIntroducirTexto}
        placeholder="Agregar producto (ej: Leche)"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={alAgregarItem}
      />

      <Pressable style={styles.addBtn} onPress={alAgregarItem}>
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
};
  
const ListaDeCompras = ({
  items,
  componenteParaCadaItem,
}: {
  items: Item[]
  componenteParaCadaItem: ListRenderItem<Item> | null | undefined;
}) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={componenteParaCadaItem}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Sin productos. ¡Agregá el primero!
        </Text>
      }
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 12 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "700",
  }, 
  pillTodo: { backgroundColor: "#eee", color: "#666" },
  pillDone: { backgroundColor: "#2ecc71", color: "#fff" },
  sep: { height: 1, backgroundColor: "#eee" },
  empty: { textAlign: "center", color: "#777", marginTop: 24 },
});