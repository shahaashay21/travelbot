import React, { Component } from 'react';
import { View, AsyncStorage, Text, Platform, PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL } from '../Config/Config';
import MapView from 'react-native-maps';
const ANCHOR = { x: 0.5, y: 0.5 };
class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            myPosition: null,
            error: null,
        };
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

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                myPosition: position.coords,
                error: null,
            });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    getPosition(){
        return(
            <MapView
                style={styles.maps}
                initialRegion={{
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/* {this.getPosition()} */}
                <MapView
                    style={styles.maps}
                    region={{
                        latitude: (this.state.latitude) || -36.82339,
                        longitude: (this.state.longitude) || -73.03569,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapView.Marker
                        anchor={ANCHOR}
                        style={{zIndex: 1000}}
                        coordinate={{
                            latitude: (this.state.latitude) || -36.82339,
                            longitude: (this.state.longitude) || -73.03569,
                        }}
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

export default Notification;