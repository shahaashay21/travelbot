import React from 'react';
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';

import Welcome from './Component/Welcome';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';

const RouterComponent = () => {
    return (
        <Router getSceneStyle={getSceneStyle}>
            <Stack key="root">
                <Scene key="welcome" component={ Welcome } hideNavBar initial />
                <Scene key="login" component={ Login } hideNavBar type={ActionConst.RESET} />
                <Scene key="register" component={ Register } hideNavBar />
                <Scene key="home" component={ Home } hideNavBar type={ActionConst.RESET} />
            </Stack>
        </Router>
    );
}

const getSceneStyle = () => ({
    backgroundColor: 'white',
    shadowOpacity:1,
    shadowRadius: 3,
});

export default RouterComponent;