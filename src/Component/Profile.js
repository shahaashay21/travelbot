import React, { Component } from 'react';
import { View, ListView, AsyncStorage, Text, ScrollView, Platform, Alert, ToastAndroid, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL } from '../Config/Config';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';
import { getMyFeed } from '../Actions/ProfileAction';
import { Spinner } from "./Common/Spinner";
import FeedDetail from "./ProfileFeedDetail";

class Profile extends Component {

    componentWillMount() {
        this.checkLoggedIn();
        this.props.getMyFeed();
    }

    renderRow(feed) {
        // console.log(feed);
        return <FeedDetail feed={feed}/>;
    }

    checkLoggedIn(){
        AsyncStorage.getItem(EMAIL).then(value => {
            if(value == null) {
                Actions.login();
            }
        });
    };

    onSettings(){
        Actions.settings();
    }

    headerComponent(){
        if(Platform.OS !== 'ios'){
            return (
                <Header
                    centerComponent={{ text: 'Profile', style: { color: '#000' } }}
                    rightComponent={
                        <Ionicons
                            raised
                            name='ios-settings'
                            type='Ionicons'
                            size={30}
                            containerStyle={{paddingLeft: 10, paddingRight: 10}}
                            onPress={this.onSettings.bind(this)}
                            style={{top: 5}}
                        />
                    }
                />
            )
        }

        return (
            <Header
                centerComponent={{ text: 'Profile', style: { color: '#000' } }}
                rightComponent={
                    <Ionicons
                        raised
                        name='ios-settings'
                        type='Ionicons'
                        size={25}
                        containerStyle={{paddingLeft: 10, paddingRight: 10}}
                        onPress={this.onSettings.bind(this)}
                        style={{top: 14}}
                    />
                }
            />
        )
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

    networkError() {
        if(this.props.error_feed){
            if(Platform.OS !== 'ios'){
                ToastAndroid.showWithGravity('Network Error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('Network Error!');
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1, paddingBottom: 70}}>
                    {this.headerComponent()}
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{top: 65}} showsVerticalScrollIndicator={false}>
                        {this.getFeed()}
                    </ScrollView>
            </View>
        );
    }
}

const styles = {
    settingsStyle: {
        alignItems: 'flex-end',
        marginTop: 30,
        marginRight: 20
    }
}

const mapStateToProps = ({ profile }) => {
    const { feed, loading, error_feed } = profile;
    return { feed, loading, error_feed };
};

export default connect(mapStateToProps, {getMyFeed})(Profile);