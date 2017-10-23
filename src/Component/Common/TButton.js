import React from 'react';

import { Button }  from 'react-native-elements';

const TButton = ({ onPress, name, buttonStyle, icon }) => {
    return (

        <Button
            onPress={ onPress }
            raised
            icon={icon}
            buttonStyle={buttonStyle}
            textStyle={{textAlign: 'center'}}
            title={name}
            borderRadius={10}
            containerViewStyle={{borderRadius:10}}
        />
    );
};

export { TButton };