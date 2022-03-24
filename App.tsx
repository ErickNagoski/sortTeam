import { useState, useEffect } from "react";
import * as Updates from "expo-updates";
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar
} from "react-native";
import ListItem from "./src/components/ListItem/ListItem";
import AsyncStorage from '@react-native-async-storage/async-storage'
import TeamList from "./src/components/TeamList";
import ModalSaveList, { handleLoadList } from "./src/components/ModalSaveList";
export interface PlayerProps {
  name: string;
  ability: number;
}

export default function App() {
  async function updateApp() {
    const { isAvailable } = await Updates.checkForUpdateAsync();

    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  useEffect(() => {
    updateApp();
  }, []);

  const [teamOne, setTeamOne] = useState<string[]>([]);
  const [teamTwo, setTeamTwo] = useState<string[]>([]);

  const [timecont1, setTimeCont1] = useState(0);
  const [timecont2, setTimeCont2] = useState(0);

  const [showTeams, setShowTeams] = useState(false);

  const [savedModal, setSavedModal] = useState(false)

  const [jogadores, setJogadores] = useState<PlayerProps[]>([])
  const [loading, setLoading] = useState(true)

  function getData() {
    setShowTeams(false)
    handleLoadList().then((res) => {
      setJogadores(res)
      setLoading(false)
    }).catch(() => {
      Alert.alert('Erro', "Não foi possivel buscar os jogadores salvos!")
      setLoading(false)
    })
  }

  useEffect(() => {
    getData();
  }, [])

  function sortSaved() {
    const nomes = jogadores;
    setTeamOne([]);
    setTeamTwo([]);
    setTimeCont1(0);
    setTimeCont2(0);

    for (let i = 1; i <= 12; i++) {
      if (nomes.length >= 1) {
        const number = Math.random() * (nomes.length - 0) + 0;
        if (i % 2 === 0) {
          const player = nomes.splice(number, 1);
          setTeamOne((state) => [...state, player[0].name]);
          setTimeCont1((state) => state + player[0].ability);
        } else {
          const player = nomes.splice(number, 1);
          setTeamTwo((state) => [...state, player[0].name]);
          setTimeCont2((state) => state + player[0].ability);
        }
      }
    }
    console.log('teamOne', teamOne.length)
    console.log('teamTwo', teamTwo.length)
    setShowTeams(true);
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>

          <View style={styles.content}>
            {jogadores.length < 1 && !showTeams && (
              <Text style={[styles.title, { marginTop: 20 }]}>Adicione novos jogadores</Text>
            )}
            {!showTeams && jogadores.length >= 1 && (
              <>
                <Text style={[styles.title, { marginTop: 10 }]}>Jogadores</Text>
                <FlatList
                  style={styles.list}
                  data={jogadores}
                  keyExtractor={(item) => `${item.name}${Math.random()}`}
                  renderItem={({ item }) => {
                    return (
                      <ListItem withRemove={false} handleRemove={async (nome: string): Promise<boolean> => { return true }} name={item.name} ability={item.ability} />
                    );
                  }}
                />
              </>

            )}

            {!showTeams && jogadores.length >= 1 && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => {
                  sortSaved()
                }}
                disabled={jogadores.length < 1}
              >
                <Text style={[styles.buttonText, { color: "#FFF" }]}>Sortear</Text>
              </TouchableOpacity>
            )}

            {showTeams && (<View style={styles.teamsContainer}>
              <View style={{ width: '50%' }}>
                <Text style={styles.title}>Time 1 </Text>
                <Text style={styles.title}>Pts: {timecont1}</Text>

                <TeamList team={teamOne} />
              </View>
              <View style={{ width: '50%' }}>
                <Text style={styles.title}>Time 2 </Text>
                <Text style={styles.title}>Pts: {timecont2}</Text>

                <TeamList team={teamTwo} />
              </View>
            </View>)}
            <View style={{ flexDirection: 'row', width: '100%', height: 40, justifyContent: "space-evenly" }}>
              <TouchableOpacity
                style={[styles.button, {
                  borderColor: "red",
                  borderWidth: 3
                }]}
                onPress={() => {
                  getData();
                }}
              >
                <Text style={styles.buttonText}>Recarregar Lista</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {
                  borderColor: "red",
                  borderWidth: 3
                }]}
                onPress={() => {
                  setSavedModal(true)
                }}
              >
                <Text style={styles.buttonText}>Editar Lista de Jogadores</Text>
              </TouchableOpacity>
            </View>
            <ModalSaveList isOpen={savedModal} onClose={() => { setSavedModal(false) }} sort={() => { }} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  content: {
    // backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: "5%",
    marginBottom: 5,
  },

  button: {
    width: "40%",
    height: 40,
    marginBottom: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 3
  },

  buttonText: {
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "yellow",
    height: 20,
    marginBottom: 5,
  },
  list: {
    width: "80%",
    maxHeight: 600,
    marginBottom: 10,
  },

  teamsContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
});
