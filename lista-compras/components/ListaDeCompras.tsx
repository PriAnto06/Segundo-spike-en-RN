import { FlatList, Text, Pressable, View, StyleSheet } from "react-native";
import { Item } from "../tipos/item";
import { useEffect } from "react";

export default function ListaDeCompras({
  items,
  alPresionarSobreUnItem,
  alMantenerPresionSobreUnItem,
}: {
  items: Item[];
  alPresionarSobreUnItem: (id: string) => void;
  alMantenerPresionSobreUnItem: (id: string) => void;
}) {
  useEffect(() => {
    console.log("items actualizado:", items);
  }, [items]);

  return (
    <View styles={styles.listaContainer}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => alPresionarSobreUnItem(item.id)}
            onLongPress={() => alMantenerPresionSobreUnItem(item.id)}
            style={styles.row}
          >
            <Text style={[styles.rowText, item.done && styles.done]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.pill,
                item.done ? styles.pillDone : styles.pillTodo,
              ]}
            >
              {item.done ? "✔" : "•"}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Sin productos. ¡Agregá el primero!</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", padding: 12, justifyContent: "space-between" },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: { minWidth: 28, textAlign: "center", borderRadius: 14 },
  pillTodo: { backgroundColor: "#eee" },
  pillDone: { backgroundColor: "#2ecc71", color: "#fff" },
  sep: { height: 1, backgroundColor: "#eee" },
  empty: { textAlign: "center", marginTop: 20 },
  listaContainer: {
    flex: 1,
    minHeight: 200, // asegura que haya espacio aunque la lista esté vacía
  },
});
