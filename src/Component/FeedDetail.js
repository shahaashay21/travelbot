import React, { Component } from 'react';
import { Text, View, Image, Linking, Button } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './Common';
import { updateUserLike } from '../Actions/HomeAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class FeedDetail extends Component {

    componentWillMount(){
        // console.log("Hi");
        // console.log(this.props);
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
        this.props.updateUserLike(this.props.feed.like_by_me, this.props.feed.id, this.props.feed.user_id, this.props.feed);
    }

    render() {
        const { feed } = this.props;
        const {trip_profile_pic, firstName, lastName, trip_name, profile_pic, likes_count, comments_count} = feed;

        const {
            headerContentStyle,
            thumbnailStyle,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle,
            likeStyle,
            likeCountStyle
        } = styles;

        return (
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={thumbnailStyle}
                            source={{uri: profile_pic}}
                        />
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
    }
}

const mapStateToProps = ({home}) => {
    const {user_like} = home;
    return {user_like};
}

export default connect(mapStateToProps, {updateUserLike})(FeedDetail);