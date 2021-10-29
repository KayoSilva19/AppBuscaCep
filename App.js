import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import api from "./src/Services/api";

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);


  async function buscar() {
    if (cep == '') {
      alert('Digite um cep valido');
      setCep('');
      return; //
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Garantir que o teclado sera fechado!

    } catch (error) {
      console.log('ERROR: ' + error);
    }


  }


  function limpar() {
    setCep('')
    inputRef.current.focus();
    setCepUser(null);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}> Digite o cep desejado </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 00000000"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="number-pad"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#1D75CD" }]}
          onPress={buscar}
        >
          <Text style={styles.botaoText}> Buscar </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#CD3E1D" }]}
          onPress={limpar}
        >
          <Text style={styles.botaoText}> Limpar </Text>
        </TouchableOpacity>
      </View>

      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep} </Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro} </Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro} </Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade} </Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf} </Text>
        </View>
      }

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: '90%',
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 22,
    color: "#FFF"
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22
  }


});
