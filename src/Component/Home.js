import React, { Component } from 'react';
import { View, ListView, AsyncStorage, Text, ScrollView, Platform, Alert, ToastAndroid, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL } from '../Config/Config';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { getFeed } from '../Actions/HomeAction';
import { Spinner } from "./Common/Spinner";
import FeedDetail from "./FeedDetail";

class Home extends Component {


    componentWillMount() {
        this.checkLoggedIn();
        this.props.getFeed();
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
                <Header
                    centerComponent={{ text: 'Travelers', style: { color: '#000' } }}
                />
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={{top: 65}} showsVerticalScrollIndicator={false}>
                    {this.getFeed()}
                </ScrollView>
                {this.networkError()}
            </View>
        );
    }
}

const mapStateToProps = ({ home }) => {
    const { feed, loading, error_feed } = home;
    return { feed, loading, error_feed };
};

export default connect(mapStateToProps, { getFeed })(Home);