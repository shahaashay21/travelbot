import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL } from '../Config/Config';
import { Spinner } from "./Common/Spinner";

class Welcome extends Component {

    componentWillMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn(){
        setTimeout(function() {
            AsyncStorage.getItem(EMAIL).then(value => {
                if(value != null) {
                    // Actions.home();
                    Actions.tabbar();
                } else {
                    Actions.login();
                }
            });
        }, 500);
    };

    render() {
        const { heading, imageView } = styles;
        return (
            <View style={{flex: 1}}>
                <Image
                    style={imageView}
                    source={require("../Assets/background1.jpg")}
                />

                <View style={ heading }>
                    <Text style={{fontSize: 24, alignSelf: 'center', marginBottom: 30}}>Social Network For Travelers</Text>
                    <Spinner size="large"/>
                </View>
            </View>
        );
    }
}

const styles = {
    heading: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageView: {
        flex: 1,
        resizeMode: 'stretch',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
};

export default Welcome;