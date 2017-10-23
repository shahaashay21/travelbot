import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
	const { textStyle, viewStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{ props.headerText }</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		height: 60,
		paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
		shadowOpacity: 0.1
	},
	textStyle: {
		fontSize: 20,
		color: '#F00'
	}
};

export { Header };