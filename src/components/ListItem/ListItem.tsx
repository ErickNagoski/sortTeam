import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { FaVolleyballBall } from "react-icons/fa";
interface ListItemProps {
    name: string;
    ability: number;
}


function ListItem({ name, ability }: ListItemProps): JSX.Element {
    const [color, setColor] = useState('');

    console.log(name, ability)

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
            <Text>{name}</Text>
            <FaVolleyballBall color={color} />

        </View>
    )
}

const styles = StyleSheet.create({

    listItem: {
        flexDirection: "row",
        backgroundColor: "yellow",
        height: 20,
        marginBottom: 5,
    },
    list: {
        backgroundColor: 'red',
        width: '80%',
        maxHeight: 300,
    }
});

export default ListItem;