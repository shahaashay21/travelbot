import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL } from '../Config/Config';

class Notification extends Component {

    componentWillMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn(){
        AsyncStorage.getItem(EMAIL).then(value => {
            if(value == null) {
                Actions.login();
            }
        });
    };

    render() {
        return (
            <View>
                <Text>Notification</Text>
            </View>
        );
    }
}

export default Notification;