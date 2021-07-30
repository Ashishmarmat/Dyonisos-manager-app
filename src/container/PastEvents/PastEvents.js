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
  ImageBackground,
  Alert as rnalert,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {pasteventsAPI} from '../../actions/PastEvents';
import {deleteeventAPI, ResetDeleteeventRes} from '../../actions/DeleteEvent';
import styles from './styles';
import {w, h} from '../../utils/Dimensions';
import {TextSize} from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings';
import fonts from '../../theme/fonts';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';

class PastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starCount: 3,
      eventList: [],
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      id: '',
      username: '',
      image: '',
      token: '',
      uiRender: false,
      selectedEventId: '',
    };
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        function () {
          if (
            Actions.currentScene === 'Login' ||
            Actions.currentScene === '_Login'
          ) {
            rnalert.alert(
              'Dyonisos',
              'Are you sure you want to exit app ?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => BackHandler.exitApp()},
              ],
              {cancelable: false},
            );
            return true;
          } else {
            return false;
          }
        }.bind(this),
      );
    });
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  bydefaultImage() {
    if (this.state.image === '') {
      return require('../../assets/assest/Stuff/managerPro.png');
    } else {
      return {
        uri: this.state.image,
      };
    }
  }
  componentWillMount = async () => {
    let id = await AsyncStorage.getItem('managerId');
    let username = await AsyncStorage.getItem('username');
    let image = await AsyncStorage.getItem('image');
    let token = await AsyncStorage.getItem('token');
    this.setState({
      username: username,
      image: image,
      token: token,
      id: id,
    });
    let data = {
      id: id,
      token: token,
    };
    this.props.PasteventCall(data);
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log('nextProps', nextProps);
    this.setState({
      isLoading: false,
    });
    if (nextProps.pastevents) {
      if (nextProps.pastevents.success === true) {
        this.setState({
          eventList: nextProps.pastevents.data,
        });
        let eventStartDate = '';
        let eventEndDate = '';
        for (let data of nextProps.pastevents.data) {
          eventStartDate = moment(data.eventStartDate).format('LL');
          eventEndDate = moment(data.eventEndDate).format('LL');
        }
        this.setState({
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
        });
      }
    }
    if (nextProps.deleteevent) {
      if (nextProps.deleteevent.success === true) {
        Alert.alert('Event deleted successfully');
        this.props.ResetDeleteeventRes({});
        const payload = {
          id: this.state.id,
          token: this.state.token,
        };
        this.props.PasteventCall(payload);
        if (this.state.uiRender === false) {
          this.setState({
            uiRender: true,
          });
        } else {
          this.setState({
            uiRender: false,
          });
        }
      }
    }
  };
  DeleteEventBtn = async (eventItem) => {
    let id = eventItem._id;
    this.setState({
      selectedEventId: eventItem._id,
    });
    let payload = {
      id: id,
      token: this.state.token,
    };
    this.props.deleteeventForm(payload);
    this.setState({
      isLoading: true,
    });
  };
  enableLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          isLoading: true,
          starCount: 3,
        });
        fetch(
          `${'https://maps.googleapis.com/maps/api/geocode/json'}?latlng=` +
            position.coords.latitude +
            ',' +
            position.coords.longitude +
            `&key=${'AIzaSyCVUUPuzrsBEv6WvaeA7YMvGIjKNUeZXmU'}`,
          {
            method: 'POST',
          },
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              isLoading: false,
            });

            if (res.status === 'OK') {
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((e) => {
            Alert.alert(e);
          });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
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
              onPress={() => this.props.navigation.navigate('Home')}
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
              <Text style={styles.headingText}>Past Events</Text>
            </View>
            <View
              style={{
                flex: 2,
              }}></View>
          </View>
        </ImageBackground>
        <ScrollView>
          {this.state.eventList != undefined &&
            this.state.eventList.map((eventItem, eventIndex) => (
              <View key={eventIndex}>
                <Image
                  source={require('../../assets/assest/Stuff/restaurant.jpg')}
                  style={styles.restaurantImage}
                />
                <View style={styles.cardView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.headerBoldText}>
                      {eventItem.eventName}
                    </Text>
                    <View style={{height: h(3), width: h(12)}}>
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
                    <Text style={styles.eventVenuetxt}>
                      {eventItem.address}
                    </Text>

                    <TouchableOpacity
                      onPress={() => this.enableLocation()}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#fce6ef',
                        borderRadius: h(10),
                        height: h(3.5),
                        paddingHorizontal: h(1),
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
                        <Text style={styles.dateLightText}>
                        {this.state.eventStartDate} 
                         {/* To  {this.state.eventEndDate} */}
                        </Text>
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
                            paddingHorizontal: h(1),
                          }}>
                          <Image
                            source={require('../../assets/assest/assest/icon-06.png')}
                            style={{
                              height: h(3),
                              width: h(3),
                            }}
                          />
                          <Text style={styles.onMapText}>
                            {eventItem.eventStartTime}
                          </Text>
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
                  <Text style={styles.desText}> {eventItem.eventDetails}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: h(2),
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={styles.hostImage}
                        source={this.bydefaultImage()}
                        resizeMode="cover"
                      />
                      <View>
                        <Text style={styles.userNameText}>
                          {this.state.username}
                        </Text>
                        <Text style={styles.lightText}>Creator</Text>
                      </View>
                    </View>
                    <View>
                    <View style={{flexDirection: 'row'}}>
                        {eventItem.eventSponsors != undefined &&
                eventItem.eventSponsors.map((intItem, intIndex) => (
                          <Image
                            source={{uri :intItem.image}}
                            style={{
                              height: h(4.5),
                              width: h(4.5),
                              borderRadius: h(5),
                              marginLeft:h(-1.5)
                            }}
                          />
                     ))}
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
                  <TouchableOpacity
                    onPress={() => this.DeleteEventBtn(eventItem)}
                    style={styles.DelBtnView}>
                    <Image
                      source={require('../../assets/assest/assest/assest/deleteIcon.png')}
                      style={{
                        height: h(2),
                        width: h(2),
                        tintColor: '#fff',
                        alignSelf: 'center',
                        marginHorizontal: h(0.7),
                      }}
                    />
                    <Text style={styles.DelbtnTextStyle}>Delete Event</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pastevents: state.pastevents,
    deleteevent: state.deleteevent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    PasteventCall: (data) => dispatch(pasteventsAPI(data)),
    deleteeventForm: (data) => dispatch(deleteeventAPI(data)),
    ResetDeleteeventRes: (data) => dispatch(ResetDeleteeventRes(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PastEvents);
