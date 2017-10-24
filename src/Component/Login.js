import React, { Component } from 'react';
import { Text, View, Image, Platform, ToastAndroid, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { TButton, Spinner } from './Common';

import { emailChanged, passwordChanged, loginUser } from '../Actions/LoginAction';

class Login extends Component {

    state = { backgroudImage: "../Assets/background1.jpg" };

    onEmailChange(text) {
        this.props.emailChanged(text.toLowerCase());
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLogin(){
        const { email, password } = this.props;
        this.props.loginUser(email, password);
    }

    onRegister(){
        Actions.register();
    }

    emailValidation(){
        if(this.props.email_validation !== ''){
            return (
                <FormValidationMessage>{this.props.email_validation}</FormValidationMessage>
            );
        }
    }

    passwordValidation(){
        if(this.props.password_validation !== ''){
            return (
                <FormValidationMessage>{this.props.password_validation}</FormValidationMessage>
            );
        }
    }

    networkError() {
        if(this.props.auth_error == true){
            if(Platform.OS !== 'ios'){
                ToastAndroid.showWithGravity('Network Error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('Network Error!');
            }
        }
    }

    signInProcess() {
        if(this.props.loading){
            return <Spinner size="large"/>
        }

        return (
            <TButton
                name="Sign In"
                icon={{name: 'person', size: 16}}
                buttonStyle={{backgroundColor: '#5cb85c', width: 180}}
                onPress={this.onLogin.bind(this)}
            />
        );
    }


    render() {

        const { heading, imageView, loginView } = styles;

        return (
          <View style={{flex: 1}}>
              <Image
                  style={imageView}
                  source={require("../Assets/background1.jpg")}
              />

              <View style={ heading }>
                  <Text style={{fontSize: 18, alignSelf: 'center'}}>Social Network For Travelers</Text>
              </View>

              <View style={loginView}>
                  <FormLabel style={{marginBottom: 3}}>Email</FormLabel>
                  <FormInput
                      placeholder="xyz@gmail.com"
                      autoCorrect={false}
                      onChangeText={this.onEmailChange.bind(this)}
                      value={this.props.email}
                  />
                  {this.emailValidation()}


                  <FormLabel style={{marginTop: 5}}>Password</FormLabel>
                  <FormInput
                      placeholder="********"
                      autoCorrect={false}
                      secureTextEntry
                      onChangeText={this.onPasswordChange.bind(this)}
                      value={this.props.password}
                  />
                  {this.passwordValidation()}

                  <View style={{alignSelf: 'center', marginTop: 35}}>
                      {this.signInProcess()}
                  </View>

                  <View style={{alignSelf: 'center', marginTop: 20}}>
                      <TButton
                          name="Sign Up"
                          icon={{name: 'person-add', size: 16}}
                          buttonStyle={{backgroundColor: '#d9534f', width: 180}}
                          onPress={this.onRegister.bind(this)}
                      />
                  </View>
              </View>
              {this.networkError()}
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
    loginView: {
        flex: 1,
        marginTop: 70,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'transparent'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, auth_error, loading, email_validation, password_validation } = auth;
    return { email, password, auth_error, loading, email_validation, password_validation };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);