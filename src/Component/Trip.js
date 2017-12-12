import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Platform, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { EMAIL } from '../Config/Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TButton, Spinner } from "./Common";
import DatePicker from 'react-native-datepicker'
import { create_trip } from '../Actions/TripAction';
import _ from 'lodash';

class Trip extends Component {

    constructor(props){
        super(props);
        this.state = {sourceDate: '', sourceDateError: 0};
        this.state = {destinationDate: ''};
        this.state = { source: '', destination: '', budget: '', sourceError: 0, destinationError: 0, budgetError: 0}
    }
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

    registerProcess(){
        if(this.props.loading){
            return(
                <Spinner size="large"/>
            );
        }
        return (
            <TButton
                name="Create Trip"
                icon={{name: 'plane', type: 'font-awesome', size: 16}}
                buttonStyle={{backgroundColor: '#d9534f', width: 180}}
                onPress={this.onRegister.bind(this)}
            />
        );
    }

    onRegister(){
        // console.log("Source: " + this.state.source);
        // console.log("Destination: " + this.state.destination);
        // console.log("Budget: " + this.state.budget);
        // console.log("SourceDate: " + this.state.sourceDate);
        // console.log("DestinationDate: " + this.state.destinationDate);

        if(_.isEmpty(this.state.source)){
            this.setState({sourceError: 1});
        }

        if(_.isEmpty(this.state.destination)){
            this.setState({destinationError: 1});
        }

        if(isNaN(this.state.budget)){
            this.setState({budgetError: 1});
        }

        if(_.isEmpty(this.state.sourceDate)){
            this.setState({sourceDateError: 1});
        }

        if(!_.isEmpty(this.state.source) && !_.isEmpty(this.state.destination) && !isNaN(this.state.budget) && !_.isEmpty(this.state.sourceDate)){
            console.log("Good to go");
            this.props.create_trip(this.state.source, this.state.destination, this.state.budget, this.state.sourceDate, this.state.destinationDate, this.state.trip_name);
        }
    }

    sourceError(){
        if(this.state.sourceError){
            if(_.isEmpty(this.state.source)){
                return (
                    <FormValidationMessage>Please enter source location</FormValidationMessage>
                )
            }
        }
    }

    destinationError(){
        if(this.state.destinationError){
            if(_.isEmpty(this.state.destination)){
                return (
                    <FormValidationMessage>Please enter destination location</FormValidationMessage>
                )
            }
        }
    }

    budgetError(){
        if(this.state.budgetError){
            if(isNaN(this.state.budget)){
                return (
                    <FormValidationMessage>This entry can only contain numbers</FormValidationMessage>
                )
            }
        }
    }

    sourceDateError(){
        if(this.state.sourceDateError){
            if(_.isEmpty(this.state.sourceDate)){
                return (
                    <FormValidationMessage>Please enter departing date</FormValidationMessage>
                )
            }
        }
    }

    networkError() {
        if(this.props.trip_error){
            if(Platform.OS !== 'ios'){
                ToastAndroid.showWithGravity('Network Error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('Network Error!');
            }
        }
    }

    render() {
        const { heading, imageView, registerView } = styles;
        return (
            <View style={{flex: 1, paddingBottom: 70}}>
                <Header
                    centerComponent={{ text: 'Create a Trip', style: { color: '#000' } }}
                />
                <ScrollView style={{ top: 65 }}>

                    <View style={registerView}>
                        <FormLabel style={{marginBottom: 3}}>Source*</FormLabel>
                        <FormInput
                            placeholder="San Francisco"
                            autoCorrect={false}
                            value={this.state.source}
                            onChangeText={(source) => this.setState({source})}
                        />
                        {this.sourceError()}

                        <FormLabel style={{marginBottom: 3}}>Destination*</FormLabel>
                        <FormInput
                            placeholder="New York"
                            autoCorrect={false}
                            value={this.state.destination}
                            onChangeText={(destination) => this.setState({destination})}
                        />
                        {this.destinationError()}

                        <FormLabel style={{marginBottom: 3}}>Title</FormLabel>
                        <FormInput
                            placeholder="Trip Name"
                            autoCorrect={false}
                            value={this.state.trip_name}
                            onChangeText={(trip_name) => this.setState({trip_name})}
                        />

                        <FormLabel style={{marginBottom: 3}}>Budget</FormLabel>
                        <FormInput
                            placeholder="5000"
                            autoCorrect={false}
                            keyboardType={Platform.iOS ? "number-pad" : "numeric"}
                            value={this.state.budget}
                            onChangeText={(budget) => this.setState({budget})}
                        />
                        {this.budgetError()}

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <FormLabel style={{marginTop: -5}}>Departing*</FormLabel>
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.sourceDate}
                                mode="date"
                                placeholder="select date"
                                format="MM-DD-YYYY"
                                minDate="1990-05-01"
                                maxDate="2050-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(sourceDate) => { this.setState({ sourceDate })}}
                            />
                        </View>
                        {this.sourceDateError()}

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <FormLabel style={{marginTop: -5}}>Returning  </FormLabel>
                            <DatePicker
                                style={{width: 200}}
                                date={this.state.destinationDate}
                                mode="date"
                                placeholder="select date"
                                format="MM-DD-YYYY"
                                minDate="1990-05-01"
                                maxDate="2050-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(destinationDate) => {this.setState({ destinationDate })}}
                            />
                        </View>


                        <View style={{alignSelf: 'center', marginTop: 20}}>
                            {this.registerProcess()}
                        </View>
                        {this.networkError()}
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

const mapStateToProps = ({ trip }) => {
    const { loading, trip_error } = trip;
    return { loading, trip_error };
};

export default connect(mapStateToProps, { create_trip })(Trip);