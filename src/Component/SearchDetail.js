import React, { Component } from 'react';
import { Text, View, Image, Linking, Button } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './Common';
import { updateUserLike } from '../Actions/HomeAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class FeedDetail extends Component {

    componentWillMount(){
    }

    checkAvailableProfile(){
        if(this.props.search.profile_pic && this.props.search.profile_pic !== ""){
            return (
                <Image
                    style={styles.thumbnailStyle}
                    source={{uri: this.props.search.profile_pic}}
                />
            )
        }else {
            return (
                <FontAwesome
                    style={styles.thumbnailStyle}
                    name='user-circle-o'
                    type='FontAwesome'
                    color='#262626'
                    size={48}
                />
            )
        }
    }

    render() {
        const { search } = this.props;
        const { firstName, lastName, profile_pic } = search;

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
                        {this.checkAvailableProfile()}
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}> {firstName} {lastName} </Text>
                    </View>
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

export default connect(mapStateToProps, {updateUserLike})(FeedDetail);