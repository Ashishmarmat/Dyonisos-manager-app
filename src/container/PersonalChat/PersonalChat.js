import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  BackHandler,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginAPI } from '../../actions/Login';
import { sidescreenAPI } from '../../actions/SideScreen';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import { TextSize } from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings';
import fonts from '../../theme/fonts';
import { Container } from 'native-base';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';

const MyMsgesData = [
  {
    userImage: require('../../assets/assest/Stuff/entrepreneur.jpg'),
    userTime: '5 min',
    userMessage: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.',
  },
];
const FriendMsgesData = [
  {
    FriendImage: require('../../assets/assest/Stuff/fashion-1063100_1920.jpg'),
    FriendTime: '5 min',
    FriendMessage: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.',
  },
];
class PersonalChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount = async () => { };

  componentWillReceiveProps = async (nextProps) => { };
  handleOnPress(value) {
    this.setState({ value: value });
    console.log('value', this.state.value);
  }
  goToPersonalChat = () => {
    Actions.PersonalChat();
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? "position" : "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : h(-50)}
          >
            <ScrollView>
              <Loader loading={this.state.isLoading} />
              <StatusBar />
              <ImageBackground
                imageStyle={{
                  borderBottomLeftRadius: h(3),
                  borderBottomRightRadius: h(3),
                }}
                source={require('../../assets/assest/assest/splashscreen-01-01.png')}
                style={styles.headerImage}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: h(1),
                    marginBottom: h(1),
                    marginTop: h(5),
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ChatList')}
                    style={{
                      flex: 2,
                    }}>
                    <Image
                      source={require('../../assets/assest/assest/icon-16.png')}
                      style={styles.bckArrow}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={require('../../assets/assest/Stuff/entrepreneur.jpg')}
                      style={styles.userImageHeader}
                    />
                    <Text style={styles.headerText}>Isabella</Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                    }}></View>
                </View>
              </ImageBackground>
              <View
                style={{
                  top: h(45),
                  paddingHorizontal: h(2),
                  height: h(87),
                }}>
                {FriendMsgesData.map((item, i) => (
                  <View style={{ alignSelf: 'flex-start' }}>
                    <TouchableOpacity style={styles.FriendMsgesCart}>
                      <Image
                        source={item.FriendImage}
                        style={{
                          height: h(5),
                          width: h(5),
                          borderRadius: h(1),
                          alignSelf: 'flex-start',
                          marginTop: h(-5)
                        }}
                        resizeMode="cover"
                      />

                      <Text style={styles.friendmessageText}>
                        {item.FriendMessage}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: h(1.8),
                        //: fonts.regularText,
                        alignSelf: 'flex-start',
                      }}>
                      {item.FriendTime}
                    </Text>
                  </View>
                ))}
                {MyMsgesData.map((item, i) => (
                  <View style={{ alignSelf: 'flex-end' }}>

                    <TouchableOpacity style={styles.MyMsgesCart}>
                      <Image
                        source={item.userImage}
                        style={{
                          height: h(5),
                          width: h(5),
                          borderRadius: h(1),
                          alignSelf: 'flex-end',
                          marginTop: h(-5)
                        }}
                        resizeMode="cover"
                      />
                      <View>
                        <Text style={styles.MymessageText}>{item.userMessage}</Text>
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: h(1.8),
                        //: fonts.regularText,
                        alignSelf: 'flex-end',
                      }}>
                      {item.userTime}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.textFieldView}>
                <TextInput
                  style={{
                    color: '#000',
                    fontSize: h(2.2),
                    padding: h(1),
                    //: fonts.lightText,
                    width: '80%',
                    left: h(1)
                  }}
                  autoCapitalize='none'
                  placeholder="Type text"
                  multiline={true}
                />
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/assest/assest/icon_11-02.png')}
                    style={{
                      width: h(3),
                      height: h(3),
                      left: h(2.5),
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../../assets/assest/assest/icon-052.png')}
                    style={{
                      width: h(7.5),
                      height: h(7.5),
                      left: Platform.OS === 'ios' ? h(6.5) : h(7),
                    }}
                    resizeMode='contain'
                  >
                    <Image
                      source={require('../../assets/assest/assest/icon-032.png')}
                      style={{
                        width: h(3.5),
                        height: h(3.5),
                        flex: 1,
                        left: 2,
                        alignSelf: "center"
                      }}
                      resizeMode='contain'
                    />
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    sidescreen: state.sidescreen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => dispatch(loginAPI(data)),
    HomeScreenApi: (data) => dispatch(sidescreenAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalChat);
