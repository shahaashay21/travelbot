import React, { Component } from 'react';
import { Text, View, Image, Linking, Button } from 'react-native';
import { Card, CardSection } from './Common';

class FeedDetail extends Component {

    render() {
        const { feed } = this.props;
        const {title, artist, thumbnail_image, image, url} = feed;

        const {
            headerContentStyle,
            thumbnailStyle,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle
        } = styles;

        return (
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={thumbnailStyle}
                            source={{uri: thumbnail_image}}
                        />
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}> {title} </Text>
                        <Text> {artist} </Text>
                    </View>
                </CardSection>

                <CardSection>
                    <Image style={imageStyle} source={{uri: image}}/>
                </CardSection>

                {/*<CardSection>*/}
                    {/*<Button onPress={ () => Linking.openURL(url) }>*/}
                        {/*Buy Now*/}
                    {/*</Button>*/}
                {/*</CardSection>*/}
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
    }
}

export default FeedDetail;