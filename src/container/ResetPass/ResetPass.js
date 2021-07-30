import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
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
import { resetpassAPI } from '../../actions/ResetPass';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import { TextSize } from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings';
import { Container } from 'native-base';
import fonts from '../../theme/fonts';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class ResetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      newpassword: "",
      token: "",
      isLoading: false,
      hidePassword: true,
      uiRender: false,
    };
  }
  
  componentWillMount = async () => {
    console.log("nextProps", nextProps);
    var oldpassword = await AsyncStorage.getItem('oldpassword');
    var newpassword = await AsyncStorage.getItem('newpassword');
    var managerId = await AsyncStorage.getItem('managerId');
    this.setState({
      managerId: managerId,
      oldpassword: oldpassword,
      newpassword: newpassword,
    });
  };
  componentWillReceiveProps = async (nextProps) => {
    console.log("nextProps", nextProps);
    this.setState({
      isLoading: false
    })
    if (nextProps.resetpass) {
      if (nextProps.resetpass.success === true) {
        Alert.alert('Your password changed successfully');
        // return false;
        console.log("reset pass successfully")
        Actions.Login();
      }
    }
  };

  ResetPassbtn = async() => {
    console.log('ResetPassbtn')
    const id = await AsyncStorage.getItem('managerId')
    if (this.state.oldpassword == "" || this.state.oldpassword == null) {
      Alert.alert("Enter your current password")
      return false;
    }
    // else if (this.state.password !== this.state.password) {
    //   Alert.alert("Please enter correct old password");
    // }
    if (this.state.newpassword == "" || this.state.newpassword == null) {
      Alert.alert("Please enter minimum 6 digit password")
      return false;
    }
    if (this.state.confirmpassword == "" || this.state.confirmpassword == null) {
      Alert.alert("Please re-enter your new password")
      return false;
    }
    
    let payload = {
      id: id,
      oldpassword: this.state.oldpassword,
      newpassword: this.state.newpassword,
    };
    console.log('manageridddddd', payload)
    this.props.submitForm(payload);
    this.setState({
      isLoading: true,
    });
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
  render() {
    console.log('this.props', this.props);
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.fixBackground}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={-50}>
                <Loader loading={this.state.isLoading} />
                <StatusBar />
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
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
                <Text style={styles.signinText}>Reset Password</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      borderBottomColor: '#ff6c6c',
                      borderBottomWidth: h(0.6),
                      width: w(30),
                      marginLeft: h(2),
                      borderRadius: 25,
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: '#ff6c6c',
                      borderBottomWidth: h(0.6),
                      width: w(4),
                      borderRadius: 25,
                      marginLeft: h(1.5),
                    }}
                  />
                </View>

                <View style={styles.cardView}>
                  <Text style={styles.passwordHeading}>Old Password</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: h(0.5),
                    }}>
                    <View style={{ flex: 1.8 }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                          onChangeText={(oldpassword) =>
                            this.setState({ oldpassword: oldpassword })}
                          value={this.state.oldpassword}
                        />
                      </View>
                    </View>
                    <TouchableOpacity onPress={this.managePasswordVisibility}>
                      <Image
                        source={(this.state.hidePassword) ?
                          require('../../assets/assest/assest/icon-eye.png') :
                          require('../../assets/assest/assest/icon-eyeOff.png')}
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: '96%',
                      alignSelf: 'center',
                      opacity: 0.15,
                      marginTop: Platform.OS === 'ios' ? h(0.2) : h(-1.5)
                    }}
                  />
                  <Text style={styles.passwordHeading}>New Password</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: h(0.5)
                    }}>
                    <View style={{ flex: 1.8 }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={require('../../assets/assest/assest/icon-02.png')}
                          style={styles.passwordIconView}
                        />
                        <TextInput
                          style={styles.InputText}
                          autoCapitalize="none"
                          keyboardType={'default'}
                          placeholder="* * * * * * * * * *"
                          secureTextEntry={true}
                          onChangeText={(newpassword) =>
                            this.setState({ newpassword: newpassword })}
                          value={this.state.newpassword}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: '96%',
                      alignSelf: 'center',
                      opacity: 0.15,
                      marginTop: Platform.OS === 'ios' ? h(0.2) : h(-1.5)
                    }}
                  />
                  <Text style={styles.passwordHeading}> Confirm Password</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: h(0.5)
                    }}>
                    <View style={{ flex: 1.8 }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={require('../../assets/assest/assest/icon-02.png')}
                          style={styles.passwordIconView}
                        />
                        <TextInput
                          style={styles.InputText}
                          autoCapitalize="none"
                          keyboardType={'default'}
                          placeholder="* * * * * * * * * *"
                          secureTextEntry={true}
                          onChangeText={(confirmpassword) =>
                            this.setState({ confirmpassword: confirmpassword })}
                          value={this.state.confirmpassword}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: '96%',
                      alignSelf: 'center',
                      opacity: 0.15,
                      marginTop: Platform.OS === 'ios' ? h(0.2) : h(-1.5)
                    }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.ResetPassbtn()}
                    style={styles.btnView}>
                    <Text style={styles.btnTextStyle}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
ResetPass.propTypes = {
  submitForm: PropTypes.func,
  resetPass: PropTypes.any,
};
const mapStateToProps = (state) => {
  console.log('kkkkk', state);
  return {
    resetpass: state.resetpass,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => dispatch(resetpassAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
