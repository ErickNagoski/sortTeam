import { Alert, Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react";
import { PlayerProps } from "../../../App";

interface ModalSaveListProps {
    isOpen: boolean;
    onClose:()=>void;
    sort:(jogadores:PlayerProps[])=>void;
}

function ModalSaveList({ isOpen, onClose, sort }: ModalSaveListProps): JSX.Element {
    const [jogadores, setJogadores] = useState<PlayerProps[]>([]);

    function handleSaveList() {
        if (jogadores) {
            AsyncStorage.setItem("players", JSON.stringify(jogadores))
                .then(() => {
                    Alert.alert("salvos");
                })
                .catch((e) => {
                    Alert.alert("Erro ao salvar!");
                });
        } else {
            AsyncStorage.setItem('players', '')
        }

    }

    async function handleLoadList(): Promise<void> {
        AsyncStorage.getItem("players")
            .catch((e) => {
                console.error(e);
                handleSaveList()
            })
            .then((res) => {
                if (res !== null) {
                    const parseString = JSON.parse(res as string);
                    setJogadores(parseString);
                    console.log(res)
                }
            });
    }

    useEffect(() => {
        handleLoadList();
        console.log('load')
    }, [])

    function handleDeleteList() {
        AsyncStorage.setItem('players', JSON.stringify([]))
    }

    function handleAlert() {
        Alert.alert(
            "Confirmar",
            "Realmente deseja excluir a lista salva?",
            [
                // The "Yes" button
                {
                    text: "Sim",
                    onPress: () => {
                        handleDeleteList
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
            ]
        );
    }



    return (
        <Modal visible={isOpen} style={styles.container}  >
            <TouchableOpacity onPress={onClose} style={{alignSelf:'flex-end', margin:10}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>X</Text>
            </TouchableOpacity>
            {jogadores.length===0&&(
                <Button title="Recarregar" onPress={handleLoadList}/>
            )}
            <View style={styles.container}>
                <FlatList
                    data={jogadores}
                    keyExtractor={(jogador) => jogador.name}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={{fontWeight:'bold'}}>{item.name}: {item.ability}</Text>
                            {/* <Button title="X" onPress={() => { }} /> */}
                        </View>
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Gerar Sorteio" onPress={() => {
                    sort(jogadores)
                    onClose()
                    }} />
                <Button color='red' title="Excluir Lista" onPress={() => {
                    handleAlert();
                }} />
            </View>
        </Modal>
    )
}

export default ModalSaveList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "100%",
        width: '100%',
        justifyContent: 'center',
        // alignItems:'center'
    },
    listItem: {
        flexDirection: "row",
        width: '80%',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#f2f2f2',
        marginLeft: 20,
        paddingLeft: 20,
        height:30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        width: '40%',
        margin: 5
    }
})