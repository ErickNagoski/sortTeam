import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlayerProps } from "../../../App";

interface TeamListProps{
    team: string[]
}

function TeamList({team}:TeamListProps): JSX.Element {
    console.log('JOgadores', team.length)
    return (   
        <FlatList
                style={styles.teamList}
                data={team}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    return <Text style={styles.nome}>{item}</Text>;
                }}
            />
    )
}

export default TeamList;

const styles = StyleSheet.create({
    teamList: {
        width: "40%",
        maxHeight: 150,
    },
    nome:{
        fontSize:14,
        fontWeight:'500',
        color:'#000'
    }
})
