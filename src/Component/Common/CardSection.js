import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={ styles.containerStyle }>
            { props.children }
        </View>
    )
}


const styles = {
    containerStyle: {
        flex: 1,
        borderBottomWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export { CardSection };