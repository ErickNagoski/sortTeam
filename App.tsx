import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ListItem from "./src/components/ListItem/ListItem";

interface PlayerProps {
  name: string;
  ability: number;
}

export default function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState<PlayerProps[]>([]);

  const [teamOne, setTeamOne] = useState<string[]>([]);
  const [teamTwo, setTeamTwo] = useState<string[]>([]);

  const [timecont1, setTimeCont1] = useState(0);
  const [timecont2, setTimeCont2] = useState(0);

  const [showTeams, setShowTeams] = useState(false);

  const saveNames = [
    { name: "Erick", ability: 2 },
    { name: "Edi", ability: 2 },
    { name: "Ana", ability: 1 },
    { name: "Lindones", ability: 2 },
    { name: "Daia", ability: 2 },
    { name: "Darlan", ability: 3 },
    { name: "Pati", ability: 2 },
    { name: "Tay", ability: 1 },
    { name: "Daigo", ability: 3 },
    { name: "Wilson", ability: 1 },
    { name: "Jardel", ability: 3 },
    { name: "Franciele", ability: 2 },
  ];

  function handleAddPlayer(ability: number) {
    if (names.length < 12) {
      setNames((state) => [...state, { name, ability }]);
    } else {
      Alert.alert("O máximo de jogadores é 12!");
    }
    console.log(names);
  }

  function sort() {
    setTeamOne([]);
    setTeamTwo([]);

    for (let i = 1; i <= 12; i++) {
      console.log(names.length);
      if (names.length >= 1) {
        const number = Math.random() * (names.length - 0) + 0;
        if (i % 2 === 0) {
          const player = names.splice(number, 1);
          setTeamOne((state) => [...state, player[0].name]);
          setTimeCont1((state) => state + player[0].ability);
        } else {
          const player = names.splice(number, 1);
          setTeamTwo((state) => [...state, player[0].name]);
          setTimeCont2((state) => state + player[0].ability);
        }
      }
    }
    setShowTeams(true);
  }

  function sortSaved() {
    const jogadores = saveNames;
    setTeamOne([]);
    setTeamTwo([]);
    setTimeCont1(0);
    setTimeCont2(0);

    for (let i = 1; i <= 12; i++) {
      console.log(jogadores.length);
      if (jogadores.length >= 1) {
        const number = Math.random() * (jogadores.length - 0) + 0;
        if (i % 2 === 0) {
          const player = jogadores.splice(number, 1);
          setTeamOne((state) => [...state, player[0].name]);
          setTimeCont1((state) => state + player[0].ability);
        } else {
          const player = jogadores.splice(number, 1);
          setTeamTwo((state) => [...state, player[0].name]);
          setTimeCont2((state) => state + player[0].ability);
        }
      }
    }
    setShowTeams(true);
  }

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TextInput
            onChangeText={(txt) => {
              setName(txt);
            }}
            style={styles.input}
            placeholder="Nome"
          />
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={() => { handleAddPlayer(3) }}><Text style={styles.buttonText}>High</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "orange" }]} onPress={() => { handleAddPlayer(2) }}><Text style={styles.buttonText}>Medium</Text></TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "blue" }]}
              onPress={sortSaved}
            >
              <Text style={styles.buttonText}>Sortear lista salva</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              disabled={names.length === 12}
              onPress={() => {
                handleAddPlayer(1);
              }}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={sort}
            // disabled={names.length === 0}
          >
            <Text style={styles.buttonText}>Sortear</Text>
          </TouchableOpacity>

          {!showTeams && (
            <>
              <Text style={[styles.title, { marginTop: 20 }]}>Jogadores</Text>
              <FlatList
                style={styles.list}
                data={names}
                keyExtractor={(item) => `${item.name}${Math.random()}`}
                renderItem={({ item }) => {
                  return (
                    <Text>{item.name}</Text>
                    // <ListItem name={item.name} ability={item.ability} />
                  );
                }}
              />
            </>
          )}

          {showTeams && (
            <View style={styles.teamListContainer}>
              <View style={styles.listContainer}>
                <Text style={styles.title}>Time 1 </Text>
                <Text style={styles.title}>Pts: {timecont1}</Text>
                <FlatList
                  style={styles.teamList}
                  data={teamOne}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    return <Text>{item}</Text>;
                  }}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.title}>Time 2</Text>
                <Text style={styles.title}>Pts: {timecont2}</Text>
                <FlatList
                  style={styles.teamList}
                  data={teamTwo}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    return <Text>{item}</Text>;
                  }}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 25,
  },

  button: {
    width: "30%",
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "yellow",
    height: 20,
    marginBottom: 5,
  },
  list: {
    width: "80%",
    maxHeight: 300,
  },
  teamList: {
    width: "50%",
    maxHeight: 150,
  },
  teamListContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
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
