import React from 'react';
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Welcome from './Component/Welcome';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
import Search from './Component/Search';
import Trip from './Component/Trip';
import Profile from './Component/Profile';
import Navigation from './Component/Navigation';
import Settings from './Component/Settings';

const HomeIcon = ({ selected, title }) => {
    return (
        <Octicons
            name='home'
            type='Octicons'
            color='#262626'
            size={24}
        />
    )
}

const SearchIcon = ({ selected, title }) => {
    return (
        <Ionicons
            name='ios-search'
            type='Ionicons'
            color='#262626'
            size={32}
        />
    )
}

const TripIcon = ({ selected, title }) => {
    return (
        <SimpleLineIcons
            name='plane'
            type='SimpleLineIcons'
            color='#262626'
            size={24}
        />
    )
}

const NotificationIcon = ({ selected, title }) => {
    return (
        <MaterialCommunityIcons
            name='map-marker-outline'
            type='Feather'
            color='#262626'
            size={32}
        />
    )
}

const ProfileIcon = ({ selected, title }) => {
    return (
        <FontAwesome
            name='user-o'
            type='FontAwesome'
            color='#262626'
            size={24}
        />
    )
}

const RouterComponent = () => {
    return (
        <Router getSceneStyle={getSceneStyle}>
            <Stack key="root">
                <Scene key="welcome" component={ Welcome } hideNavBar initial />
                <Scene key="login" component={ Login } hideNavBar type={ActionConst.RESET} />
                <Scene key="register" component={ Register } hideNavBar />

                <Scene
                    key="tabbar"
                    tabs
                    swipeEnabled
                    showLabel={false}
                    inactiveBackgroundColor="#FFF"
                    activeBackgroundColor="#DDD"
                    tabBarStyle={{backgroundColor: '#FFFFFF'}}
                    tabBarPosition='bottom'
                    type={ActionConst.RESET}
                >
                    <Scene key="home" title="Home" icon={HomeIcon}>
                        <Scene key="home" component={ Home } hideNavBar type={ActionConst.RESET} initial/>
                    </Scene>

                    <Scene key="search" title="Search" icon={SearchIcon}>
                        <Scene key="search" component={ Search } hideNavBar type={ActionConst.RESET} initial/>
                    </Scene>

                    <Scene key="trip" title="Trip" icon={TripIcon}>
                        <Scene key="trip" component={ Trip } hideNavBar type={ActionConst.RESET} initial/>
                    </Scene>

                    <Scene key="notification" title="Notification" icon={NotificationIcon}>
                        <Scene key="notification" component={ Navigation } hideNavBar type={ActionConst.RESET} initial/>
                    </Scene>

                    <Scene key="profile" title="Profile" icon={ProfileIcon} >
                        <Scene key="profile" component={ Profile } hideNavBar type={ActionConst.RESET} initial/>
                    </Scene>

                </Scene>
                <Scene key="settings" component={ Settings } hideNavBar back-={true} />
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