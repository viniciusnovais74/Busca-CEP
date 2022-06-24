import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import api from "./src/services/api";
export default function App() {
  const [cep, setCep] = useState("");
  const inputRef = React.useRef(null);
  const [result, setResult] = useState();
  async function getData() {
    if (cep == '') {
      alert('Digite um cep valido');
      setCep('')
      return;
    }
    try {
      const response = await api.get(`/${cep}/json/`)
      setResult(response.data)
    } catch (err) {
      console.log("Error" + err)
    }

  }
  function limpar() {
    setCep("");
    setResult();
    inputRef.current.focus();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType="numeric"
          ref={inputRef} />
      </View>
      <View style={styles.areabtn}>
        <TouchableOpacity onPress={getData} style={[styles.botao, { backgroundColor: "#1d75cd" }]}>
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={limpar} style={[styles.botao, { backgroundColor: "#cd3e1d" }]}>
          <Text style={styles.textBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {!result ? null : (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {result.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {result.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {result.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {result.localidade}</Text>
          <Text style={styles.itemText}>Estado: {result.uf}</Text>
        </View>)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18
  },
  areabtn: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around"
  },
  botao: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FF0000"
  },
  textBtn: {
    fontSize: 18,
    color: "#FFF"
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {

  }

});