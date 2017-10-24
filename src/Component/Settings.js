import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL } from '../Config/Config';
import { Header } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TButton } from "./Common/TButton";

class Settings extends Component {

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

    backButton(){
        console.log("Back Button")
        Actions.pop();
    }

    logout(){
        AsyncStorage.removeItem(EMAIL);
        this.checkLoggedIn();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Header outerContainerStyles={{ zIndex: 1 }}
                    leftComponent={<Ionicons
                        name='ios-arrow-back'
                        type='Ionicons'
                        size={36}
                        onPress={() => Actions.pop()}
                        style={{top: 10}}
                        />
                    }
                    centerComponent={{ text: 'Settings', style: { color: '#000' } }}
                />
                <View style={{justifyContent: 'flex-end', flex:1, paddingBottom: 10}}>
                    <TButton
                        name="Log out"
                        icon={{name: 'power-settings-new', size: 24}}
                        buttonStyle={{backgroundColor: '#d9534f', height:50}}
                        onPress={this.logout.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

export default Settings;