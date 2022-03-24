import { Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react";
import { PlayerProps } from "../../../App";
import ListItem from "../ListItem/ListItem";

interface ModalSaveListProps {
    isOpen: boolean;
    onClose: () => void;
    sort: (jogadores: PlayerProps[]) => void;
}
export async function handleLoadList(): Promise<PlayerProps[]> {
    return new Promise<PlayerProps[]>((resolve, reject) => {
        try {
            AsyncStorage.getItem("players")
                .catch((e) => {
                    console.error(e);
                    reject()
                })
                .then((res) => {
                    if (res !== null) {
                        const storageList = JSON.parse(res as string);
                        console.log(storageList)
                        resolve(storageList)
                    }
                });
        } catch (error) {
            reject()
        }
    })
}


function ModalSaveList({ isOpen, onClose, sort }: ModalSaveListProps): JSX.Element {
    const [jogadores, setJogadores] = useState<PlayerProps[]>([]);

    const [nome, setNome] = useState('');

    async function handleSaveList(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {

                if (jogadores && jogadores.length >= 1) {
                    AsyncStorage.setItem("players", JSON.stringify(jogadores))
                        .then(() => {
                            Alert.alert("", "Salvo com sucesso!");
                            resolve(true)
                        })
                        .catch((e) => {
                            Alert.alert('', "Erro ao salvar!");
                            reject()
                        });
                } else {
                    AsyncStorage.setItem('players', '')
                    Alert.alert('', "Erro ao salvar!");
                }

            } catch (error) {
                reject()
            }
        })
    }



    useEffect(() => {
        handleLoadList().then(response => {
            setJogadores(response)
        }).catch(() => {
            console.log('erro ao buscar dados')
        })
    }, [])


    function handleDeleteList(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.setItem('players', JSON.stringify([])).then(() => {
                    console.log('Apagou')
                }).then(() => {
                    resolve(true)
                }).catch(() => {
                    reject()
                })

            } catch (error) {
                reject()
            }
        })

    }

    function handleAlert() {
        Alert.alert(
            "Confirmar",
            "Realmente deseja excluir a lista salva?",
            [
                // The "Yes" button

                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
                {
                    text: "Sim",
                    onPress: () => {
                        handleDeleteList().then(() => {
                            handleLoadList().then((response) => {
                                setJogadores(response)
                            })
                        })
                    },
                },
            ]
        );
    }

    async function handleRemove(nome: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const filter = jogadores.filter(item => item.name !== nome)
                setJogadores(filter)
                handleSaveList().then(() => {
                    resolve(true)
                })
            } catch (error) {
                reject()
            }
        })
    }



    return (
        <Modal visible={isOpen} style={styles.container}  >
            <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fechar</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                value={nome}
                placeholder='Nome:'
                onChangeText={(text) => {
                    setNome(text)
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} disabled={jogadores.length === 12} onPress={() => {
                    if (jogadores.length < 12) {
                        if (nome.length >= 1) {

                            setJogadores(state => [...state, {
                                name: nome,
                                ability: 3
                            }])
                        }
                    } else {
                        Alert.alert('Atenção!', "Número máximo de jogadores atingido!")
                    }
                    setNome('')
                }}>
                    <Text>Nível 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} disabled={jogadores.length === 12} onPress={() => {
                    if (jogadores.length < 12) {
                        if (nome.length >= 1) {

                            setJogadores(state => [...state, {
                                name: nome,
                                ability: 2
                            }])
                        }
                    } else {
                        Alert.alert('Atenção!', "Número máximo de jogadores atingido!")
                    }
                    setNome('')
                }}>
                    <Text>Nível 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} disabled={jogadores.length === 12} onPress={() => {
                    if (jogadores.length < 12) {
                        if (nome.length >= 1) {

                            setJogadores(state => [...state, {
                                name: nome,
                                ability: 1
                            }])
                        }
                    } else {
                        Alert.alert('Atenção!', "Número máximo de jogadores atingido!")
                    }
                    setNome('')
                }}>
                    <Text>Nível 1</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={handleSaveList}>
                    <Text>Salva Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleLoadList().then((response) => {
                        setJogadores(response)
                    })
                }}>
                    <Text>Recarregar Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleAlert}>
                    <Text>Apagar Lista</Text>
                </TouchableOpacity>
            </View>
            {jogadores.length >= 1 && (
                <FlatList
                    data={jogadores}
                    keyExtractor={(item) => item.name + Math.random()}
                    renderItem={({ item }) => (
                        <ListItem name={item.name} ability={item.ability} handleRemove={handleRemove} withRemove />
                    )}
                />)}

        </Modal >
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
        height: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        width: '30%',
        height: 40,
        margin: 5,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: "center"
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingLeft: 10

    }
})