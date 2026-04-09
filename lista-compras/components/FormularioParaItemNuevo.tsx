import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

export default function FormularioParaItemNuevo({
  alCompletarFormulario,
}: {
  alCompletarFormulario: (texto: string) => void;
}) {
  const [texto, setTexto] = useState("");

 const manejarAgregar = () => {
  if (!texto.trim()) return;
  console.log("Formulario envía:", texto);
  alCompletarFormulario(texto);
  setTexto("");
};

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Agregar producto"
        style={styles.input}
        onSubmitEditing={manejarAgregar}
      />
      <Pressable style={styles.addBtn} onPress={manejarAgregar}>
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: "row", gap: 8, marginTop: 16 },
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
    justifyContent: "center",
  },
  addTxt: { color: "#fff", fontWeight: "600" },
});