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
  BackHandler,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { rockingeventAPI } from '../../actions/RockingEvent';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import { TextSize } from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings';
import fonts from '../../theme/fonts';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class RockingEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starCount: 3,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  bydefaultImage() {
    if (this.state.eventImg !== '') {
        return (
            require('../../assets/assest/Stuff/restaurant.jpg')
        )
    } else {
        return {
            uri: this.state.eventImg
        }
    }
}
  componentDidMount = async () => {
    const eventId = await AsyncStorage.getItem('eventId')
    const data = {
      eventId: "5f72c1850d262494b6071324"
    }
    this.props.eventCall(data)
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log("nextProps", nextProps);
    this.setState({
      isLoading: false
    })
    if (nextProps.rockingevent) {
      if (nextProps.rockingevent.success === true) {
        this.setState({
          eventName: nextProps.rockingevent.datalist.eventName,
          address: nextProps.rockingevent.datalist.address,
          eventStartDate: nextProps.rockingevent.datalist.eventStartDate,
          eventStartTime: nextProps.rockingevent.datalist.eventStartTime,
          eventImg: nextProps.rockingevent.datalist.eventImg,
          eventDetails: nextProps.rockingevent.datalist.eventDetails,
        })
      }
    }
  };

  render() {
    return (
      <SafeAreaView
        style={styles.mainContainer}
        behavior="position"
        keyboardVerticalOffset={-150}>
        <Loader loading={this.state.isLoading} />
        <StatusBar />
        <ImageBackground
          imageStyle={{
            borderBottomLeftRadius: h(2),
            borderBottomRightRadius: h(2),
          }}
          source={require('../../assets/assest/assest/splashscreen-01-01.png')}
          style={styles.headerImage}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginLeft: h(1),
              marginBottom: h(-2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateEvent')}
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
              }}>
              <Text style={styles.headingText}>Rock King</Text>
            </View>
            <View
              style={{
                flex: 2,
              }}></View>
          </View>
        </ImageBackground>
        <ScrollView>
          <Image
           source={this.bydefaultImage()}
            style={styles.restaurantImage}
          />
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* <Text style={styles.headerBoldText}>Rock king Event</Text> */}
              <Text style={styles.headerBoldText}>{this.state.eventName}</Text>

              <View style={{ height: h(3), width: h(12) }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.starCount}
                  starSize={13}
                  emptyStarColor="#f2f2f2"
                  fullStarColor="#ffc107"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: h(1),
              }}>
              {/* <Text style={styles.lightText}>North Little Rock, USA 72800</Text> */}
            <Text style={styles.lightText}>{this.state.address}</Text>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fce6ef',
                  borderRadius: h(10),
                  height: h(3.5),
                  width: w(25),
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assets/assest/assest/icon-05.png')}
                  style={styles.locationIcon}
                />
                <Text style={styles.onMapText}>On Map</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: h(1.5),
              }}>
              <View>
                <Text style={styles.semiBoldText}>Date</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: h(1),
                  }}>
                  <Image
                    source={require('../../assets/assest/assest/icon-07.png')}
                    style={styles.locationIcon}
                  />
                  <Text style={styles.timeLightText}>{this.state.eventStartDate}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.semiBoldText}>Time</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: h(1),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fce6ef',
                      borderRadius: h(10),
                      height: h(3),
                      width: w(22),
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/assest/assest/icon-06.png')}
                      style={styles.locationIcon}
                    />
                    {/* <Text style={styles.onMapText}>9:00 AM</Text> */}
                    <Text style={styles.onMapText}>{this.state.eventStartTime}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: h(1),
                alignItems: 'center',
              }}></View>
            <Text style={styles.semiBoldText}>Description</Text>
            {/* <Text style={styles.desText}>
              Lorem Ipsum is ffffd simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s.
            </Text> */}
            <Text style={styles.desText}> {this.state.eventDetails}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: h(2),
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../assets/assest/Stuff/entrepreneur.jpg')}
                  style={styles.hostImage}
                />
                <View>
                  <Text style={styles.userNameText}>Smith zone</Text>
                  <Text style={styles.lightText}>Creator</Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row', marginLeft: h(2) }}>
                    <Image
                      source={require('../../assets/assest/Stuff/girl01.jpg')}
                      style={{
                        height: h(4.5),
                        width: h(4.5),
                        borderRadius: h(5),
                      }}
                    />
                    <Image
                      source={require('../../assets/assest/Stuff/fashion-1063100_1920.jpg')}
                      style={{
                        height: h(4.5),
                        width: h(4.5),
                        borderRadius: h(5),
                        marginLeft: h(-1),
                      }}
                    />
                    <Image
                      source={require('../../assets/assest/Stuff/entrepreneur.jpg')}
                      style={{
                        height: h(4.5),
                        width: h(4.5),
                        borderRadius: h(5),
                        marginLeft: h(-1),
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: h(3),
                width: h(12),
                marginTop: h(1),
              }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.state.starCount}
                starSize={13}
                emptyStarColor="#f2f2f2"
                fullStarColor="#ffc107"
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// Login.propTypes = {
//   submitForm: PropTypes.func,
//   login: PropTypes.any
// }

const mapStateToProps = (state) => {
  return {
    rockingevent: state.rockingevent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    eventCall: (data) => dispatch(rockingeventAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RockingEvent);
