import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {loginAPI} from '../../actions/Login';
import {sidescreenAPI} from '../../actions/SideScreen';
import styles from './styles';
import {w, h} from '../../utils/Dimensions';
import {TextSize} from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings';
import fonts from '../../theme/fonts';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import {initDB, MasconSiteData, massconSiteList} from '../../database';

class ScanCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount = async () => {};

  componentWillReceiveProps = async (nextProps) => {};
  handleOnPress(value) {
    this.setState({value: value});
    console.log('value', this.state.value);
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <Loader loading={this.state.isLoading} />
        <StatusBar />
        <View style={styles.Container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ScanTicket')}>
              <Image
                source={require('../../assets/assest/assest/icon-16.png')}
                style={styles.bckArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.ScanHistory()}>
              <Image
                source={require('../../assets/assest/assest/assest/scan_icon-4-01.png')}
                style={{
                  height: h(4),
                  width: h(4),
                  marginRight: h(2),
                  marginTop: h(1.5),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: h(2.7),
              // fontFamily: fonts.bold,
              alignSelf: 'center',
              marginTop: h(1),
            }}>
            Scan QR code
          </Text>
          <Text
            style={{
              color: 'gray',
              padding: h(1.5),
              fontSize: h(1.9),
              // fontFamily: fonts.lightText,
              textAlign: 'center',
            }}>
            loream ipsum dolor sit amet, loream ipsum dolor sit amet
            consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod
            tincidunt
          </Text>
          <View
            style={{
              marginTop: h(12),
            }}>
            <Image
              source={require('../../assets/assest/assest/assest/scan_img1-01-02.png')}
              style={styles.ScanIcon}
              resizeMode="cover"
            />
          </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                top: h(10),
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/assest/assest/assest/scan_icon-01.png')}
                  style={{
                    height: h(4),
                    width: h(4),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/assest/assest/assest/scan_icon-02.png')}
                  style={{
                    height: h(4),
                    width: h(4),
                    marginHorizontal: h(8),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/assest/assest/assest/scan_icon-03.png')}
                  style={{
                    height: h(4),
                    width: h(4),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              // onPress={() => Actions.Login()}
              style={styles.btnView}>
              <Text style={styles.btnTextStyle}>Let's Get Started</Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanCode);
