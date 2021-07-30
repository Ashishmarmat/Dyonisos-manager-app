import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { signupAPI } from '../../actions/SignUp';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import Loader from '../../constants/Loader';
import { countryList } from './countryList.json';
import AsyncStorage from '@react-native-community/async-storage';
import ModalDropdown from 'react-native-modal-dropdown-deprecated-support';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      deviceToken: '',
      value: null,
      checked: false,
      loginstatus: "",
      emailCheck: '',
      hidePassword: true,
      uiRender: false,
      countryList: [],
      username: '',
      country: '',
      userInfo: {},
      gettingLoginStatus: true,
    };
  }
  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,country',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({ userInfo: user });
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  // logoutWithFacebook = () => {
  //   LoginManager.logOut();
  //   this.setState({ userInfo: {} });
  // };
  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  /////////////////////////////////////////////////////////////////////////////////

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      // console.log('Please Login');
      // alert('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount = async () => {

//initial configuration
GoogleSignin.configure({
  //It is mandatory to call this method before attempting to call signIn()
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  // Repleace with your webClientId generated from Firebase console
  webClientId: 'my webclient id',
});
//Check if user is already signed in
this._isSignedIn();

    var email = "";
    var password = "";
    var country = "";
    this.setState({
      email: email,
      password: password,
      country: country,
    });
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log("nextProps", nextProps);
    this.setState({
      isLoading: false
    })
    if (nextProps.SignUp) {
      if (nextProps.SignUp.success === true) {
        Alert.alert('Your account has been successfully created');
        // Actions.SignUpForm({prevScreen: "Signup"});
        Actions.Login()
      }
      else {
        Alert.alert('Manager Already Registered');
      }
    }
  };
  doLogin = () => {

    if (this.state.email == '' || this.state.email == null) {
      Alert.alert('Please enter email');
      return false;
    }
    var text = this.state.email;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      Alert.alert('Email is not Correct');
      return false;
    }
    else if (this.state.password == '' || this.state.password == null) {
      Alert.alert('Please enter password');
      return false;
    }
    else if (this.state.country == '' || this.state.country == null) {
      Alert.alert('Please select country');
    }
    else {
      let payload = {
        email: this.state.email,
        password: this.state.password,
        country: this.state.country,
        username: this.state.username
      };
      this.props.submitForm(payload);
      this.setState({
        isLoading: true,
      });
    }

  };
  oncheckvalue = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({ checked: !this.state.checked });
      if (this.state.checked == true) {
        AsyncStorage.setItem('EmailValue', this.state.email);
        AsyncStorage.setItem('password', this.state.password);
        AsyncStorage.setItem('country', this.state.country)
      }
    }
  };
  goToForgotPassword = () => {
    Actions.ForgetPass();
  };
  handleOnPress(value) {
    this.setState({ value: value });
    console.log('value', this.state.value);
  }
  managePasswordVisibility = () => {
    if (this.state.hidePassword === true) {
      this.setState({
        hidePassword: false
      })
    } else if (this.state.hidePassword === false) {
      this.setState({
        hidePassword: true
      })
    }
    if (this.state.uiRender === false) {
      this.setState({
        uiRender: true
      })
    } else {
      this.setState({
        uiRender: false
      })
    }
  }
  countryList() {
    this.setState({
      countryList: value
    });
  }

  displayCompanyRow = (data) => {
    // console.log("data",data);
    return (
      <Text style={{ padding: 7, backgroundColor: '#fff' }}>{data.name}</Text>
    );
  };

  selectAnimal = (idx, value) => {
    console.log(value);
    this.setState({
      country: value.name,
    });
  };

  render() {
    const isLogin = this.state.userInfo.name;
    const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior="position"
            keyboardVerticalOffset={-240}>
            <Loader loading={this.state.isLoading} />
            <StatusBar />

            <Image
              source={require('../../assets/assest/assest/logoApp.png')}
              style={styles.headerImage}
            />
            <Text style={styles.signinText}>Sign up</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: h(-0.3),
              }}>
              <View
                style={{
                  borderBottomColor: '#ff6c6c',
                  borderBottomWidth: h(0.6),
                  width: '9%',
                  marginLeft: h(2),
                  borderRadius: h(5),
                }}
              />
              <View
                style={{
                  borderBottomColor: '#ff6c6c',
                  borderBottomWidth: h(0.6),
                  width: '3%',
                  borderRadius: h(5),
                  marginLeft: h(2),
                }}
              />
            </View>
            <View style={styles.cardView}>
              <Text style={styles.UsernameText}>Email Id</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: h(7)
                }}>
                <Image
                  source={require('../../assets/assest/assest/icon-01.png')}
                  style={styles.userIconView}
                />
                <TextInput
                  style={styles.InputText}
                  autoCapitalize="none"
                  placeholder="smithzone@word.com"
                  multiline={true}
                  onChangeText={(email) => this.setState({ email: email })}
                  value={this.state.email}
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: '96%',
                  alignSelf: 'center',
                  opacity: 0.1,
                  marginTop: h(-1),
                }}
              />
              <Text style={styles.UsernameText}>Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: h(6),
                }}>
                <View style={{ width: "90%" }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assets/assest/assest/icon-02.png')}
                      style={styles.passwordIconView}
                    />
                    <TextInput
                      style={styles.InputText}
                      autoCapitalize="none"
                      keyboardType={'default'}
                      placeholder="* * * * * * * * * *"
                      secureTextEntry={this.state.hidePassword}
                      onChangeText={(password) =>
                        this.setState({ password: password })}
                      value={this.state.password}
                    />
                  </View>
                </View>
                <View style={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                  <TouchableOpacity onPress={this.managePasswordVisibility}>
                    <Image
                      source={(this.state.hidePassword) ?
                        require('../../assets/assest/assest/icon-eye.png') :
                        require('../../assets/assest/assest/icon-eyeOff.png')}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>

              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width: '96%',
                  alignSelf: 'center',
                  opacity: 0.1,
                  marginTop: h(-1),
                }}
              />
              <Text style={styles.UsernameText}> Country</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <ModalDropdown
                    style={{
                      height: h(7),
                      width: '100%',
                      backgroundColor: '#fff',
                      paddingHorizontal: h(2),
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}

                    dropdownStyle={{
                      width: '80%',
                      height: h(75),
                      marginTop: h(15),
                      padding: h(2),
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    dropdownTextStyle={{
                      color: '#000',
                      fontSize: 14,
                    }}

                    options={countryList}
                    renderRow={(row) => this.displayCompanyRow(row)}
                    onSelect={(idx, value) => this.selectAnimal(idx, value)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: h(2.1),
                          width: w(76),
                          opacity: 0.7
                        }}>
                        {this.state.country == '' || this.state.country == null
                          ? 'Select country'
                          : this.state.country}
                      </Text>
                      <Image
                        source={require('../../assets/assest/assest/icon-04.png')}
                        style={{
                          height: h(3.5),
                          width: h(3.5),
                          // right:h(1)
                        }}
                        resizeMode='contain'
                      />
                    </View>
                  </ModalDropdown>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.doLogin()}
              style={styles.btnView}>
              <Text style={styles.btnTextStyle}>Sign up</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: h(2),
                width: '90%',
                alignSelf: "center",
                opacity: 0.20
              }}
            />
            <Text style={styles.socialMediaText}>Or use your Social Media Account</Text>
            <View style={{
              flexDirection: "row",
              // marginHorizontal: h(2),
              justifyContent: "center",
              height: h(8)
            }}>
                <TouchableOpacity
                  onPress={onPressButton}>
                  <Image
                    source={require('../../assets/assest/assest/icon-39.png')}
                    style={styles.fbIcon}
                  />
                </TouchableOpacity>
                {/* {this.state.userInfo.name && (
                  <Text style={{ fontSize: 16, marginVertical: 16 }}>
                    Logged in As {this.state.userInfo.name}
                  </Text>
                )} */}
              <TouchableOpacity 
              onPress={this._signIn}>
                <Image
                  source={require('../../assets/assest/assest/icon-40.png')}
                  style={styles.fbIcon}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text style={styles.socialMediaText}>Do you have an account?</Text>
              <TouchableOpacity onPress={() => Actions.Login()}>
                <Text style={styles.signupText}> Sign in</Text>
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('kkkkk', state);
  return {
    SignUp: state.SignUp,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => dispatch(signupAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
