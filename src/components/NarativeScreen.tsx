import * as React from 'react';
import { Text, View } from "react-native"

const NarativeScreen = ({currentIndication}) => {
    return (
        <View>
            <Text>{currentIndication}</Text>
        </View>
    )
}

export default NarativeScreen;