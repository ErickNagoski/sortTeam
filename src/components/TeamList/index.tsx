import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlayerProps } from "../../../App";

interface TeamListProps{
    team: PlayerProps[]
}

function TeamList({team}:TeamListProps): JSX.Element {
   console.log('mudou $$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    return (   
        <FlatList
                style={styles.teamList}
                data={team}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                    return <Text>{item.name}</Text>;
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
})
