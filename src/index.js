import React from 'react';
import {Scene, Router, Stack, Drawer} from 'react-native-router-flux';
import {Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {h} from './utils/Dimensions';
import DrawerBar from './component/Drawer/Drawer';
import Splash from './container/Splash/Splash';
import Login from './container/Login/Login';
import SignUp from './container/SignUp/SignUp';
import ForgetPass from './container/ForgetPass/ForgetPass';
import Home from './container/Home/Home';
import Notification from './container/Notification/Notification';
import CreateEvent from './container/CreateEvent/CreateEvent';
import PastEvents from './container/PastEvents/PastEvents';
import RockingEvent from './container/RockingEvent/RockingEvent';
import Reservation from './container/Reservation/Reservation';
import EventFeedback from './container/EventFeedback/EventFeedback';
// import ScanTicket from './container/ScanTicket/ScanTicket';
// import ScanCode from './container/ScanCode/ScanCode';
// import ScanHistory from './container/ScanHistory/ScanHistory';
import ChatList from './container/ChatList/ChatList';
import PersonalChat from './container/PersonalChat/PersonalChat';
import ManagerProfile from './container/ManagerProfile/ManagerProfile';
import ResetPass from './container/ResetPass/ResetPass';
import UpdatePro from './container/UpdatePro/UpdatePro';
import AllEvents from './container/AllEvents/AllEvents';
import SignUpForm from './container/SignUpForm/SignUpForm';
import EditEvent from './container/EditEvent/EditEvent';
import EventDetails from './container/EventDetails/EventDetails';
import GoogleMap from './container/GoogleMap/GoogleMap';

const RouterWithRedux = connect()(Router);

var width = Dimensions.get('window').width;
var image;
var tintcolor;
const TabIcon = ({selected, title, img, focused}) => {
  switch (title) {
    case 'Home':
      image = focused
        ? require('./assets/assest/assest/icon-23.png')
        : require('./assets/assest/assest/icon-23.png');
      tintcolor = focused ? '#df396b' : '#000';
      break;

    case 'Create Event':
      image = focused
        ? require('./assets/assest/assest/assest/icon_22-03.png')
        : require('./assets/assest/assest/assest/icon_22-03.png');
      tintcolor = focused ? '#df396b' : '#000';
      break;

    // case 'Scan':
    //   image = focused
    //     ? require('./assets/assest/assest/assest/icon_22-11.png')
    //     : require('./assets/assest/assest/assest/icon_22-11.png');
    //   tintcolor = focused ? '#df396b' : '#000';
    //   break;

    case 'Inbox':
      image = focused
        ? require('./assets/assest/assest/icon-25.png')
        : require('./assets/assest/assest/icon-25.png');
      tintcolor = focused ? '#df396b' : '#000';
      break;

    case 'Me':
      image = focused
        ? require('./assets/assest/assest/icon-26.png')
        : require('./assets/assest/assest/icon-26.png');
      tintcolor = focused ? '#df396b' : '#000';
      break;
  }
  return (
    <Image
      source={image}
      style={{width: h(3.5), height: h(3.5), tintColor: tintcolor}}
      resizeMode="contain"></Image>
  );
};

class Root extends React.Component {
  render() {
    return (
      <RouterWithRedux>
        <Scene key="root" hideTabBar hideNavBar>
          <Stack key="app">
            <Scene hideNavBar panHandlers={null}>
              <Scene
                initial={true}
                component={Splash}
                hideNavBar={true}
                key="Splash"
                title="Splash"
                wrap={false}
              />
              <Scene
                component={Login}
                hideNavBar={true}
                key="Login"
                title="Login"
              />
              <Scene
                component={SignUp}
                hideNavBar={true}
                wrap={false}
                key="SignUp"
                title="SignUp"
              />
              <Scene
                component={SignUpForm}
                hideNavBar={true}
                wrap={false}
                key="SignUpForm"
                title="SignUpForm"
              />
              <Scene
                component={ForgetPass}
                hideNavBar={true}
                wrap={false}
                key="ForgetPass"
                title="ForgetPass"
              />
              {/* <Scene
                component={ScanTicket}
                hideNavBar={true}
                wrap={false}
                key="ScanTicket"
                title="ScanTicket"
              />
              <Scene
                component={ScanCode}
                hideNavBar={true}
                wrap={false}
                key="ScanCode"
                title="ScanCode"
              />
              <Scene
                component={ScanHistory}
                hideNavBar={true}
                wrap={false}
                key="ScanHistory"
                title="ScanHistory"
              /> */}
              <Scene
                component={GoogleMap}
                hideNavBar={true}
                wrap={false}
                key="GoogleMap"
                title="GoogleMap"
              />
               <Scene
                component={EventDetails}
                hideNavBar={true}
                wrap={false}
                key="EventDetails"
                title="EventDetails"
              />
              <Scene
                component={PersonalChat}
                hideNavBar={true}
                wrap={false}
                key="PersonalChat"
                title="PersonalChat"
              />
              <Scene
                component={UpdatePro}
                hideNavBar={true}
                wrap={false}
                key="UpdatePro"
                title="UpdatePro"
              />
              <Scene
                component={ResetPass}
                hideNavBar={true}
                wrap={false}
                key="ResetPass"
                title="ResetPass"
              />
              <Scene
                component={EventFeedback}
                hideNavBar={true}
                wrap={false}
                key="EventFeedback"
                title="EventFeedback"
              />
              <Scene
                component={RockingEvent}
                hideNavBar={true}
                wrap={false}
                key="RockingEvent"
                title="RockingEvent"
              />
              <Scene
                component={AllEvents}
                hideNavBar={true}
                wrap={false}
                key="AllEvents"
                title="AllEvents"
              />
              <Scene
                component={Reservation}
                hideNavBar={true}
                wrap={false}
                key="Reservation"
                title="Reservation"
              />
              <Scene
                component={Notification}
                hideNavBar={true}
                wrap={false}
                key="Notification"
                title="Notification"
              />

              <Scene
                component={PastEvents}
                hideNavBar={true}
                wrap={false}
                key="PastEvents"
                title="PastEvents"
              />
              <Scene
                component={EditEvent}
                hideNavBar={true}
                wrap={false}
                key="EditEvent"
                title="EditEvent"
              />
              <Drawer
                hideNavBar
                key="drawer"
                onExit={() => {
                  console.log('Drawer closed');
                }}
                onEnter={() => {
                  console.log('Drawer opened');
                }}
                contentComponent={DrawerBar}
                drawerWidth={width - 80}>
                <Scene
                  key="tabbar"
                  tabs
                  tabBarStyle={{
                    backgroundColor: '#fff',
                    paddingVertical: h(0.5),
                  }}>
                  <Scene title="Home" icon={TabIcon} img={image}>
                    <Scene
                      component={Home}
                      hideNavBar={true}
                      key="Home"
                      title="Home"
                      wrap={false}></Scene>
                  </Scene>
                  <Scene title="Create Event" icon={TabIcon} img={image}>
                    <Scene
                      component={CreateEvent}
                      hideNavBar={true}
                      wrap={false}
                      key="CreateEvent"
                      title="CreateEvent"
                    />
                  </Scene>
                  <Scene title="Inbox" icon={TabIcon} img={image}>
                    <Scene
                      component={ChatList}
                      hideNavBar={true}
                      wrap={false}
                      key="ChatList"
                      title="ChatList"
                    />
                  </Scene>
                  <Scene key="Me" title="Me" icon={TabIcon} img={image}>
                    <Scene
                      component={ManagerProfile}
                      hideNavBar={true}
                      wrap={false}
                      key="ManagerProfile"
                      title="ManagerProfile"
                    />
                  </Scene>
                </Scene>
              </Drawer>
            </Scene>
          </Stack>
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default Root;
console.disableYellowBox = true;
