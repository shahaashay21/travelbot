import React, { Component } from 'react';
import { View, AsyncStorage, Text, Platform, ListView, ScrollView } from 'react-native';
import { Header, SearchBar, Card } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Spinner } from "./Common/Spinner";
import { EMAIL } from '../Config/Config';
import { doUserSearch, doPlaceSearch, doTripSearch } from '../Actions/SearchAction';
import SearchDetail from "./SearchDetail";

class Search extends Component {

    componentWillMount() {
        this.checkLoggedIn();
        this.search("");
    }

    checkLoggedIn(){
        AsyncStorage.getItem(EMAIL).then(value => {
            if(value == null) {
                Actions.login();
            }
        });
    };

    platformChange(){
        if(Platform.OS == 'ios'){
            return (
                <View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </View>
            );
        }
        return;
    }

    loading(){
        if(this.props.loading){
            return (
                <View style={{flex:1, justifyContent: 'center', alignContent:'center'}}>
                    <Spinner size="large"/>
                </View>
            );
        }
        return;
    }

    networkError() {
        if(this.props.error_search){
            if(Platform.OS !== 'ios'){
                ToastAndroid.showWithGravity('Network Error!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
                Alert.alert('Network Error!');
            }
        }
    }

    search(searchString){
        this.props.doUserSearch(searchString);
        this.props.doPlaceSearch(searchString);
        this.props.doTripSearch(searchString);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    openUser(){
        console.log("Open user profile");
    }

    renderUserSearchResult(){
        if(this.props.userSearchResult && this.props.userSearchResult !== ""){
            if(this.props.userSearchResult.length > 0){

                var userLoop = this.props.userSearchResult;
                for (var i = 0; i < userLoop.length; i++) {
                    if(!userLoop[i]['profile_pic'] || userLoop[i]['profile_pic'] == ''){
                        userLoop[i]['profile_pic'] = 'https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png';
                    }
                    userLoop[i]['name'] = this.capitalizeFirstLetter(userLoop[i]['firstName']) + ' ' + this.capitalizeFirstLetter(userLoop[i]['lastName']);
                };
                return(
                <View>
                    <Card title='USERS' containerStyle={{marginBottom: 20}}>
                        {
                        userLoop.map((l, i) => (
                            <ListItem
                            roundAvatar
                            avatar={{uri:l.profile_pic}}
                            key={i}
                            title={l.name}
                            onPress={this.openUser()}
                            />
                        ))
                        }
                    </Card>
                </View>
                )
            }
        }
    }

    renderPlaceSearchResult(){
        if(this.props.placeSearchResult && this.props.placeSearchResult !== ""){
            if(this.props.placeSearchResult.length > 0){

                var userLoop = this.props.placeSearchResult;
                return(
                <Card title='PLACES' containerStyle={{marginBottom: 20}}>
                    {
                    userLoop.map((l, i) => (
                        <ListItem
                        roundAvatar
                        key={i}
                        title={l.place_name}
                        subtitle={l.description}
                        subtitleNumberOfLines={5}
                        />
                    ))
                    }
                </Card>
                )
            }
        }
    }

    renderTripSearchResult(){
        if(this.props.tripSearchResult && this.props.tripSearchResult !== ""){
            if(this.props.tripSearchResult.length > 0){

                var userLoop = this.props.tripSearchResult;
                return(
                <Card title='TRIPS' containerStyle={{marginBottom: 20}}>
                    {
                    userLoop.map((l, i) => (
                        <ListItem
                        roundAvatar
                        key={i}
                        title={l.source}
                        subtitle={l.description}
                        subtitleNumberOfLines={5}
                        />
                    ))
                    }
                </Card>
                )
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1, paddingBottom: 5, flexDirection: 'column'}}>
                {this.platformChange()}
                <SearchBar
                    containerStyle={{position: 'relative'}}
                    round
                    placeholder="User name or Place name or Trip name"
                    clearIcon
                    onChangeText={this.search.bind(this)}
                />
                <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                    {this.renderUserSearchResult()}
                    {this.renderPlaceSearchResult()}
                    {this.renderTripSearchResult()}
                </ScrollView>
                {this.loading()}
                {this.networkError()}
            </View>
        );
    }
}

const mapStatToProp = ({search}) => {
    const { error_search, loading, userSearchResult, placeSearchResult, tripSearchResult } = search;
    return { error_search, loading, userSearchResult, placeSearchResult, tripSearchResult };
}

export default connect(mapStatToProp, { doUserSearch, doPlaceSearch, doTripSearch })(Search);