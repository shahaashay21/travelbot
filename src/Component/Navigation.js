import React, { Component } from 'react';
import { View, AsyncStorage, Text, Platform, PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { EMAIL, mapStyle } from '../Config/Config';
import MapView from 'react-native-maps';
import {sendPosition} from '../Actions/NavigationAction';

const ANCHOR = { x: 0.5, y: 0.5 };
class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            myPosition: null,
            error: null,
            initialLatitude: null,
            initialLongitude: null
        };
    }

    componentWillMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn(){
        AsyncStorage.getItem(EMAIL).then(value => {
            if(value == null) {
                Actions.login();
            }else{
                console.log(value);
                this.state.email = value;
            }
        });
    };

    sendPositionToServer(){
        this.props.sendPosition('sad',this.state.latitude, this.state.longitude);
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                myPosition: position.coords,
                error: null,
            });
            this.initialPosition(position.coords.latitude, position.coords.longitude);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );

        var self = this;
        // setInterval(function(){
        //     if(self.state.latitude && self.state.longitude){
        //         self.props.sendPosition(self.state.email,self.state.latitude, self.state.longitude);
        //     }
        // }, 60000);
    }

    initialPosition(){
        this.setState({
            initialLatitude: this.state.latitude,
            initialLongitude: this.state.longitude
        })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* {this.getPosition()} */}
                <MapView
                    style={styles.maps}
                    showsUserLocation={ true }
                    showsMyLocationButton = { true }
                    region={{
                        latitude: (this.state.initialLatitude) || 37.3357807,
                        longitude: (this.state.initialLongitude) || -121.8821639,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                    <MapView.Marker
                        anchor={ANCHOR}
                        style={{zIndex: 1000}}
                        coordinate={{
                            latitude: (this.state.latitude) || 37.3357807,
                            longitude: (this.state.longitude) || -121.8821639,
                        }}
                        title={"You"}
                    />
                </MapView>
                {/* <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text> */}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    maps:{
        left:0,
        right:0,
        top:0,
        bottom:0,
        position: 'absolute'
    }
}

const mapStateToProps = ({ navigation }) => {
    return {};
};

export default connect(mapStateToProps, {sendPosition})(Notification);