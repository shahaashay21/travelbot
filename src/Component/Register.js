import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Platform, ToastAndroid, Alert } from 'react-native';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TButton, Spinner } from "./Common";

import { firstNameChanged, lastNameChanged, emailChanged, passwordChanged, registerUser  } from '../Actions/RegisterAction';

class Register extends Component {

    backButton() {
        Actions.login();
    }

    backIcon(){
        if(Platform.OS === 'ios') {
            return (
                <Ionicons
                    raised
                    name='ios-arrow-back'
                    type='Ionicons'
                    color='#d9534f'
                    size={36}
                    style={{position: 'absolute', left: 20}}
                    onPress={this.backButton.bind(this)} />
            )
        }
    }

    onFirstNameChange(text) {
        this.props.firstNameChanged(text);
    }

    onLastNameChange(text) {
        this.props.lastNameChanged(text);
    }

    onEmailChange(text) {
        this.props.emailChanged(text.toLowerCase());
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onRegister() {
        const { first_name, last_name, email, password } = this.props;
        this.props.registerUser(first_name, last_name, email, password);
    }

    validationFirstName(){
        if(this.props.first_name_validation != '') {
            return (
                <FormValidationMessage>Invalid First Name</FormValidationMessage>
            )
        }
    }

    validationLastName(){
        if(this.props.last_name_validation != '') {
            return (
                <FormValidationMessage>Invalid Last Name</FormValidationMessage>
            )
        }
    }

    validationEmail(){
        if(this.props.email_validation != '') {
            return (
                <FormValidationMessage>Invalid Email</FormValidationMessage>
            )
        }
    }

    validationPassword(){
        if(this.props.password_validation != '') {
            return (
                <FormValidationMessage>Invalid Passowrd</FormValidationMessage>
            )
        }
    }

    registerProcess(){
        if(this.props.loading){
            return(
                <Spinner size="large"/>
            );
        }
        return (
            <TButton
                name="Sign Up"
                icon={{name: 'person-add', size: 16}}
                buttonStyle={{backgroundColor: '#d9534f', width: 180}}
                onPress={this.onRegister.bind(this)}
            />
        );
    }

    networkError() {
        if(this.props.reg_error){
            if(Platform.OS !== 'ios'){
                ToastAndroid.showWithGravity('Network Error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('Network Error!');
            }
        }
    }

    userExist(){
        if(this.props.available){
            if(Platform.OS !== 'ios'){
                ToastAndroid.showWithGravity('User is already exist', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('User is already exist');
            }
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
                        <Text style={{fontSize: 18, alignSelf: 'center'}}>Social Network For Travelers</Text>
                    </View>

                    <View style={registerView}>
                        <FormLabel style={{marginBottom: 3}}>First Name</FormLabel>
                        <FormInput
                            placeholder="John"
                            autoCorrect={false}
                            value={this.props.first_name}
                            onChangeText={this.onFirstNameChange.bind(this)}
                        />
                        {this.validationFirstName()}

                        <FormLabel style={{marginBottom: 3}}>Last Name</FormLabel>
                        <FormInput
                            placeholder="Doe"
                            autoCorrect={false}
                            value={this.props.last_name}
                            onChangeText={this.onLastNameChange.bind(this)}
                        />
                        {this.validationLastName()}

                        <FormLabel style={{marginBottom: 3}}>Email</FormLabel>
                        <FormInput
                            placeholder="xyz@gmail.com"
                            autoCorrect={false}
                            value={this.props.email}
                            onChangeText={this.onEmailChange.bind(this)}
                        />
                        {this.validationEmail()}

                        <FormLabel style={{marginTop: 5}}>Password</FormLabel>
                        <FormInput
                            placeholder="********"
                            autoCorrect={false}
                            secureTextEntry
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                        />
                        {this.validationPassword()}


                        <View style={{alignSelf: 'center', marginTop: 20}}>
                            {this.registerProcess()}
                        </View>
                        {this.networkError()}
                        {this.userExist()}
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

const mapStateToProps = ({ reg }) => {
    const { first_name, last_name, email, password,
        first_name_validation, last_name_validation, email_validation, password_validation,
        loading, reg_error, available, success } = reg;
    return { first_name, last_name, email, password,
        first_name_validation, last_name_validation, email_validation, password_validation,
        loading, reg_error, available, success };
};


export default connect(mapStateToProps, { firstNameChanged, lastNameChanged, emailChanged, passwordChanged, registerUser })(Register);