import React from 'react';
import PropTypes from 'prop-types';
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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { forgetpassAPI } from '../../actions/ForgetPass';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings';
import { Container } from 'native-base';
import fonts from '../../theme/fonts';
import { SafeAreaView } from 'react-navigation';
class ForgetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userName: '',
      password: '',
      passwordShow: true,
      deviceToken: ''
    };
  }
  componentWillReceiveProps = async (nextProps) => {
    console.log("forgotscreensssss", nextProps);
    this.setState({
      isLoading: false
    })
    if (nextProps.forgetpaswword) {
      if (nextProps.forgetpaswword.success === true) {
        Alert.alert("Reset password link send successfully");
        // return false;
        console.log("reset pass link send")
        Actions.Login();
      }
      else {
        Alert.alert(nextProps.forgetpaswword.message);
        return false;
      }
    }
  };
  doLogin = () => {
    console.log('frgtPass')
    if (this.state.userName == "" || this.state.userName == null) {
      Alert.alert("Please enter email");
      return false;
    }
    var text = this.state.userName;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      Alert.alert("Email is not Correct");
      return false;
    }
    let payload = {
      email: this.state.userName,
    };
    this.props.submitForm(payload);
    this.setState({
      isLoading: true,
    });
  };
  render() {
    console.log('this.props', this.props);
    return (
      <SafeAreaView style={styles.mainContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === 'ios' ? -30 : -150}>

            <Loader loading={this.state.isLoading} />
            <StatusBar />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Image
                source={require('../../assets/assest/assest/icon-16.png')}
                style={styles.bckArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image
              source={require('../../assets/assest/assest/logoApp.png')}
              style={styles.headerImage}
            />
            <View style={{ padding: h(3) }}>
              <Text style={styles.signinText}>Forgot Password</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    borderBottomColor: '#ff6c6c',
                    borderBottomWidth: h(0.6),
                    width: w(28),
                    borderRadius: h(5),
                    marginTop: h(-0.5),
                  }}
                />
                <View
                  style={{
                    borderBottomColor: '#ff6c6c',
                    borderBottomWidth: h(0.6),
                    width: w(4),
                    borderRadius: h(5),
                    marginLeft: h(1.5),
                    marginTop: h(-0.5),
                  }}
                />
              </View>
              <View style={styles.cardView}>
                <Text style={styles.UsernameText}>Username or Email</Text>
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
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.InputText}
                      autoCapitalize="none"
                      placeholder="smithzone@word.com"
                      multiline={true}
                      keyboardType="email-address"
                      onChangeText={(userName) =>
                        this.setState({ userName: userName })
                      }
                      value={this.state.userName}
                    />
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width: '98%',
                    alignSelf: 'center',
                    opacity: 0.1,
                    marginTop: h(-1),
                  }}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.doLogin()}
                  style={styles.btnView}>
                  <Text style={styles.btnTextStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
ForgetPass.propTypes = {
  submitForm: PropTypes.func,
  forgetPass: PropTypes.any,
};

const mapStateToProps = (state) => {
  console.log('state',state);
  return {
    forgetpaswword: state.forgetpaswword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => dispatch(forgetpassAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);
