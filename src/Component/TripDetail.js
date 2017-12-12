import React, { Component } from 'react';
import { View, ListView, AsyncStorage, Text, ScrollView, Platform, Alert, ToastAndroid, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getSingleTrip, getSingleTripInformation } from '../Actions/TripDetailAction';
import { Spinner } from "./Common/Spinner";
import TripDetailInformation from "./TripDetailInformation";
import { Card, CardSection } from './Common';

class TripDetail extends Component {
    componentWillMount(){
        console.log(this.props.current_trip_id);
        this.props.getSingleTrip(this.props.current_trip_id);
        this.props.getSingleTripInformation(this.props.current_trip_id);
    }

    backButtonComponent(){
        if(Platform.OS !== 'ios'){
            return(
                <Header outerContainerStyles={{ zIndex: 1 }}
                    leftComponent={<Ionicons
                        name='ios-arrow-back'
                        type='Ionicons'
                        size={36}
                        onPress={() => Actions.pop()}
                        style={{top: 10}}
                        />
                    }
                    centerComponent={{ text: this.props.current_trip_name, style: { color: '#000' } }}
                />
            );
        }

        return(
            <Header outerContainerStyles={{ zIndex: 1 }}
                leftComponent={<Ionicons
                    name='ios-arrow-back'
                    type='Ionicons'
                    size={28}
                    onPress={() => Actions.pop()}
                    style={{top: 15}}
                    />
                }
                centerComponent={{ text: this.props.current_trip_name, style: { color: '#000' } }}
            />
        );
    }

    renderRow(feed) {
        // console.log(feed);
        return <TripDetailInformation feed={feed}/>;
    }

    getFeed(){
        if(this.props.loading){
            return (
                <View style={{flex:1, justifyContent: 'center', alignContent:'center'}}>
                    <Spinner size="large"/>
                </View>
            );
        } else {
            if(this.props.feed && this.props.feed.trips && this.props.feed.trips != '') {
                const ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });

                console.log(this.props.feed.trips);
                this.dataSource = ds.cloneWithRows(this.props.feed.trips);
                return (
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                );
            }
        }
    }

    restofInformation(){
        if(this.props.feed && this.props.feed.trips && this.props.feed.trips != '') {
            console.log(this.props.feed.trips[0]);
            // return (<Text> {this.props.feed.trips[0].description} </Text>);
            return (
                <View style={{ marginTop: 10 }}>
                    <View style={{flexDirection: 'row', marginLeft: 5}}>
                        <Text style={{ fontSize: 14 }}>Source: </Text>
                        <Text style={{ fontSize: 14 }}>{this.props.feed.trips[0].source} </Text>
                        <Text style={{ fontSize: 14, marginLeft: 20 }}>Destination: </Text>
                        <Text style={{ fontSize: 14 }}>{this.props.feed.trips[0].destination} </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                        <Text style={{ fontSize: 14 }}>Start Date: </Text>
                        <Text style={{ fontSize: 14 }}>{this.props.feed.trips[0].trip_start_date} </Text>
                    </View>
                    <Text style={styles.headingStyle}>Description: </Text>
                    <Text style={styles.descriptionStyle}> {this.props.feed.trips[0].description} </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.backButtonComponent()}
                
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={{top: 65}} showsVerticalScrollIndicator={false}>
                    {this.getFeed()}
                </ScrollView>
                <View style={{position: 'relative', top: 65}}>
                    {this.restofInformation()}
                </View>
                
                
            </View>
        );
    }
}

const mapStateToProps = ({ tripDetail }) => {
    const { feed, loading, error_feed } = tripDetail;
    return { feed, loading, error_feed };
};

const styles = {
    headingStyle: {
        marginLeft: 5,
        fontSize: 14,
        marginTop: 10
    },
    descriptionStyle: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        fontSize: 12
    },
    containerStyle: {
        flex: 1,
        borderBottomWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative'
    }
}
export default connect(mapStateToProps, { getSingleTrip, getSingleTripInformation})(TripDetail);