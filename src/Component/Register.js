import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Platform } from 'react-native';
import { Icon, FormLabel, FormInput } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

import { TButton } from "./Common/TButton";

class Register extends Component {

    backButton() {
        Actions.login();
    }

    backIcon(){
        if(Platform.OS === 'ios') {
            return (
                <Icon
                    name='ios-arrow-back'
                    type='ionicon'
                    color='#d9534f'
                    size={32}
                    style={{position: 'absolute', left: 20}}
                    onPress={this.backButton.bind(this)} />
            )
        }
    }

    render() {
        const { heading, imageView, registerView } = styles;

        return (
            <View style={{flex: 1}}>
                <Image
                    style={imageView}
                    source={require("../Assets/background1.jpg")}
                />

                <ScrollView>
                    <View style={ heading }>
                        {this.backIcon()}
                        <Text style={{fontSize: 24, alignSelf: 'center'}}>Social Network For Travelers</Text>
                    </View>

                    <View style={registerView}>
                        <FormLabel style={{marginBottom: 3}}>First Name</FormLabel>
                        <FormInput
                            placeholder="John"
                            autoCorrect={false}
                        />

                        <FormLabel style={{marginBottom: 3}}>Last Name</FormLabel>
                        <FormInput
                            placeholder="Doe"
                            autoCorrect={false}
                        />

                        <FormLabel style={{marginBottom: 3}}>Email</FormLabel>
                        <FormInput
                            placeholder="xyz@gmail.com"
                            autoCorrect={false}
                        />

                        <FormLabel style={{marginTop: 5}}>Password</FormLabel>
                        <FormInput
                            placeholder="********"
                            autoCorrect={false}
                            secureTextEntry
                        />


                        <View style={{alignSelf: 'center', marginTop: 20}}>
                            <TButton
                                name="Sign Up"
                                icon={{name: 'person-add', size: 16}}
                                buttonStyle={{backgroundColor: '#d9534f', width: 180}}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    heading: {
        height: 120,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageView: {
        flex: 1,
        resizeMode: 'stretch',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    registerView: {
        flex: 1,
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'transparent'
    }
};
export default Register;