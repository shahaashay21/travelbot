import React, { Component } from 'react';
import { Text, View, Image, Linking, Button, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './Common';
import { updateUserLike, deleteTrip } from '../Actions/ProfileAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class FeedDetail extends Component {

    componentWillMount(){
    }

    likedOrNot(){
        if(this.props.feed.like_by_me){
            return(
                <Ionicons
                    style={{marginLeft: 20}}
                    name='ios-heart'
                    type='Ionicons'
                    color='#db2e2e'
                    size={28}
                    onPress={this.onLike.bind(this)}
                />
            )
        }
        return(
            <Ionicons
                style={{marginLeft: 20}}
                name='md-heart-outline'
                type='Ionicons'
                size={28}
                onPress={this.onLike.bind(this)}
            />
        )
    }

    onLike(){
        // console.log(this.props.feed.user_id);
        this.props.updateUserLike(this.props.feed.like_by_me, this.props.feed.id, this.props.feed.user_id);
    }

    onDelete(){
        // console.log(this.props.feed.user_id);
        this.props.deleteTrip(this.props.feed.id);
    }

    userAvatar(){
        if(!this.props.feed.profile_pic || this.props.feed.profile_pic == "" || this.props.feed.profile_pic.indexOf("http") == -1){
            this.props.feed.profile_pic = 'https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png';
        }

        return(
            <Image
                style={styles.thumbnailStyle}
                source={{uri: this.props.feed.profile_pic}}
            />
        )
    }

    render() {
        const { feed } = this.props;
        const {trip_profile_pic, firstName, lastName, trip_name, profile_pic, likes_count, comments_count, timeDiff} = feed;

        const {
            headerContentStyle,
            thumbnailStyle,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle,
            likeStyle,
            likeCountStyle,
            timeStyle
        } = styles;

        return (
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        {this.userAvatar()}
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}> {firstName} {lastName} </Text>
                        <Text> {trip_name} </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <Image style={imageStyle} source={{uri: trip_profile_pic}}/>
                </CardSection>

                {/*<CardSection>*/}
                    {/*<Button onPress={ () => Linking.openURL(url) }>*/}
                        {/*Buy Now*/}
                    {/*</Button>*/}
                {/*</CardSection>*/}
                <CardSection>
                    {this.likedOrNot()}
                    <Text style={likeCountStyle}> {likes_count}  </Text>
                    <FontAwesome
                        style={{marginLeft: 15}}
                        name='comment-o'
                        type='FontAwesome'
                        color='#262626'
                        size={24}
                    />
                    <Text style={likeCountStyle}> {comments_count}  </Text>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <FontAwesome
                            style={{right: 15}}
                            name='trash-o'
                            type='FontAwesome'
                            color='#db2e2e'
                            size={24}
                            onPress={this.onDelete.bind(this)}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <Text style={timeStyle}> {timeDiff} </Text>
                </CardSection>
            </Card>
        );
    }
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height:300,
        flex: 1,
        width: null
    },
    likeCountStyle: {
        marginLeft: 0,
        top: 3,
        fontSize: 16
    },
    timeStyle: {
        marginLeft: 10,
        fontSize: 12
    }
}

const mapStateToProps = ({home}) => {
    const {user_like} = home;
    return {user_like};
}

export default connect(mapStateToProps, {updateUserLike, deleteTrip})(FeedDetail);