import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
interface ListItemProps {
    name: string;
    ability: number;
    handleRemove: (nome: string) => Promise<boolean>
    withRemove: boolean
}

function ListItem({ name, ability, handleRemove, withRemove }: ListItemProps): JSX.Element {
    const [color, setColor] = useState('');

    useEffect(() => {
        switch (ability) {
            case 3:
                setColor('red');
                break;
            case 2:
                setColor('orange');
                break;
            case 1:
                setColor('green')
                break;
            default:
                break;
        }
    })

    return (
        <View style={styles.listItem}>
            <View style={{ width: "50%" }}>
                <Text>{name}</Text>
            </View>
            <FontAwesome5 name="volleyball-ball" size={24} color={color} />

            {withRemove && (
                <TouchableOpacity onPress={async () => {
                    handleRemove(name).then(() => {
                    }).catch(() => {
                        console.log('erro')
                    })
                }}>
                    <FontAwesome5 name="trash" size={24} color="#000" />
                </TouchableOpacity>)}
        </View>
    )
}

const styles = StyleSheet.create({

    listItem: {
        marginHorizontal: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        height: 40,
        marginBottom: 5,
        justifyContent: "space-between",
        alignItems: "center"

    },
    list: {
        backgroundColor: 'red',
        width: '80%',
        maxHeight: 300,
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
    }
});

export default ListItem;