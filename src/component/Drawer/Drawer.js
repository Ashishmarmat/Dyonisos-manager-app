import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import fonts from '../../theme/fonts';
import { w, h } from '../../utils/Dimensions';
import { drawermenuAPI } from '../../actions/DrawerMenu';
import AsyncStorage from '@react-native-community/async-storage';

class DrawerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      show: false,
      //   email:"",
      //   firstName:"",
      //   lastName:"",
      //   pin:""
    };
  }
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };
  toggleDrawer = () => {
    Actions.drawerToggle();
  };
  componentWillReceiveProps = async (nextProps) => {
    // console.log("sidemenu", nextProps.login.userData);
    // var email = await AsyncStorage.getItem('email');
    // console.log("email", email);
    // this.setState({
    //   email:email
    // })
  };
  componentDidMount() {
    // this.getData()
  }
  //   getData = async () => {
  //     try {
  //       const firstName = await AsyncStorage.getItem('firstName')
  //       const lastName = await AsyncStorage.getItem('lastName')
  //       const pin = await AsyncStorage.getItem('pin')
  //       if(firstName !== null || lastName !== nulll || pin !== null) {
  //         // value previously stored
  //         this.setState({
  //           firstName:firstName,
  //           lastName:lastName,
  //           pin:pin
  //         })
  //         console.log(firstName,lastName)
  //         console.log("pin",pin)

  //       }
  //     } catch(e) {
  //       // error reading value
  //     }
  //   }

  onClickUpdateProfile = () => {
    Actions.UpdatePro({prevScreen: "Drawer"})
  }
  logoutFunc = () =>{
    console.log("InsideLogout")
    AsyncStorage.removeItem('managerId')
    Actions.Login()
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#df396b',
              marginTop: h(5),
              marginBottom: h(3),
            }}>
            <TouchableOpacity onPress={Actions.drawerToggle}>
              <Image
                source={require('../../assets/assest/assest/icon-16.png')}
                style={styles.bckArrow}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.drawerToggle}>
              <Text style={styles.headerText}>Settings and privacy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.drawerList}>
            <View>
              <TouchableOpacity
                onPress={this.ShowHideComponent}
              >
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    source={require('../../assets/assest/assest/icon-26.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}>Manage my account</Text>
                </View>
              </TouchableOpacity>
              {this.state.show ? (
                <View>
                  <TouchableOpacity onPress={() => this.onClickUpdateProfile()}>
                    <View style={styles.drawerView}>
                      <Text style={styles.minusIcon}> - </Text>
                      <Text style={styles.drawerText}>Update profile</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={Actions.ResetPass}>
                    <View style={styles.drawerView}>
                      <Text style={styles.minusIcon}> - </Text>
                      <Text style={styles.drawerText}>Reset password</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <TouchableOpacity
            onPress={() => console.log('Privacy and safety')}
            >
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/icon-18.png')}
                  resizeMode="contain"
                />
                <Text style={styles.drawerText}>Privacy and safety</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.CreateEvent}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/assest/icon_22-03.png')}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.drawerText}>Create event</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.AllEvents}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/assest/icon_22-03.png')}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.drawerText}>All events</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.PastEvents}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/assest/icon_22-03.png')}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.drawerText}>Past events</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.Reservation}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/icon-20.png')}
                  resizeMode="contain"
                />
                <Text style={styles.drawerText}>Reservation manager</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Actions.EventFeedback}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/assest/icon_22-10.png')}
                  resizeMode="contain"
                />
                <Text style={styles.drawerText}>Event feedback</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={Actions.ScanTicket}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/assest/icon_22-11.png')}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.drawerText}>Scan ticket</Text>
                </View>
              </View>
            </TouchableOpacity> */}
             <TouchableOpacity onPress={() => this.logoutFunc()}>
              <View style={styles.drawerView}>
                <Image
                  style={styles.inputIcon}
                  source={require('../../assets/assest/assest/icon-22.png')}
                  resizeMode="contain"
                />
                <Text style={styles.drawerText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

DrawerBar.propTypes = {};

const mapStateToProps = (state) => {
  // return {
  //   login: state.login,
  //   drawermenu:state.drawermenu
  // }
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   submitForm: (data) => dispatch(drawermenuAPI(data)),
  // }
};
export default DrawerBar;
// export default connect(mapStateToProps, mapDispatchToProps)(DrawerBar);
