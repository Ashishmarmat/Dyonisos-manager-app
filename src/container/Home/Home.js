import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert as rnalert,
  BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { alleventsAPI } from '../../actions/AllEvents';
import { upcomingeventsAPI } from '../../actions/UpcomingEvents';
import { w, h } from '../../utils/Dimensions';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starCount: 3,
      eventList: [],
      upcomingEventList: [],
      token: ''
    };
  }
  async componentWillMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        function () {
          if (
            Actions.currentScene === 'Home' ||
            Actions.currentScene === '_Home'
          ) {
            rnalert.alert(
              'Dyonisos',
              'Are you sure you want to exit app ?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => BackHandler.exitApp() },
              ],
              { cancelable: false },
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
  componentWillMount = async () => {
    const id = await AsyncStorage.getItem('managerId')
    const token = await AsyncStorage.getItem('token')
    const data = {
      id: id,
      token: token
    };
    console.log("data", data)
    this.props.AlleventCall(data);
    this.props.UpcomingeventCall(data);
  };
  componentWillReceiveProps = async (nextProps) => {
    console.log('nextProps', nextProps);
    this.setState({
      isLoading: false,
    });
    if (nextProps.allevents) {
      if (nextProps.allevents.success === true) {
        this.setState(
          {
            eventList: nextProps.allevents.datalist,
          },
        );
        console.log('eventList', this.state.eventList);
        // let eventStartDate = '';
        // let eventEndDate = '';
        // for (let data of nextProps.allevents.datalist) {
        //   eventStartDate = moment(data.eventStartDate).format('LL');
        //   eventEndDate = moment(data.eventEndDate).format('LL');
        // }
        // this.setState({
        //   eventStartDate: eventStartDate,
        //   eventEndDate: eventEndDate,
        // });
      }
    }
    if (nextProps.upcomingevents) {
      if (nextProps.upcomingevents.success === true) {
        this.setState(
          {
            upcomingEventList: nextProps.upcomingevents.data,
          },
          () =>
            console.log('this.state.upcomingevents', this.state.upcomingEventList)
        );
      }
    }
  };
  EventData = (eventItem) => {
    console.log("EventData eventItem", eventItem);
    Actions.EventDetails({ eventId: eventItem._id });
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <StatusBar />
        {/* <StickyParallaxHeader headerType="TabbedHeader" /> */}
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
              justifyContent: 'space-between',
              marginTop: h(4),
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginHorizontal: h(2),
              }}
              onPress={() => Actions.drawerOpen()}>
              <Image
                style={styles.menuIcon}
                source={require('../../assets/assest/assest/icon12-01.png')}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: h(3),
                  // fontFamily: fonts.semiBold,
                  padding: h(1),
                }}>
                Home
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => Actions.Notification()}
              style={{
                alignSelf: 'center',
                marginHorizontal: h(2),
              }}>
              <Image
                style={styles.menuIcon}
                source={require('../../assets/assest/assest/assest/icon_22-01.png')}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: h(6),
              width: w(92),
              marginTop: h(2),
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: h(3),
            }}>
            <TextInput
              style={styles.InputText}
              autoCapitalize="none"
              multiline={true}
              placeholder="Search"></TextInput>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              // paddingLeft: h(2),
              marginVertical: h(2),
            }}>
            <TouchableOpacity>
              <Text style={styles.TypesOfEventList}>All</Text>
              <View
                style={{
                  borderBottomColor: '#fff',
                  borderBottomWidth: h(0.3),
                  width: w(3.5),
                  borderRadius: 25,
                  alignSelf: 'center',
                  marginLeft: h(1),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.TypesOfEventList}>Club Event</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.TypesOfEventList}>Party Event</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.TypesOfEventList}>Couple Event</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.TypesOfEventList}>VIP Event</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ImageBackground
          imageStyle={{
            borderRadius: h(2),
          }}
          source={require('../../assets/assest/Stuff/restaurant.jpg')}
          style={styles.restaurantImage}
          resizeMode="cover">
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              padding: h(2),
            }}>
            <Text style={styles.headerBoldText}>Rock king Event</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.lightText}>North Little Rock, USA 72800</Text>
              <View style={{ height: h(3), width: h(11) }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.starCount}
                  starSize={12}
                  emptyStarColor="#f2f2f2"
                  fullStarColor="#ffc107"
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <Text
          style={{
            color: '#000',
            fontSize: h(2),
            // fontFamily: fonts.semiBold,
            paddingLeft: h(2.5),
            marginVertical: h(2),
            fontWeight: 'bold'
          }}>
          Created by me
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false} horizontal={true}>
          {this.state.eventList != undefined &&
            this.state.eventList.map((eventItem, eventIndex) => (
              <View key={eventIndex}>
                <TouchableOpacity
                  onPress={() => this.EventData(eventItem)}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    minHeight: h(11.5),
                    width: h(33),
                    borderRadius: h(2),
                    marginLeft: h(2),
                    padding: h(0.8),
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                    <Image
                      style={styles.partyImage}
                      source={require('../../assets/assest/Stuff/audience-868074_1920.jpg')}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: h(0.5),
                      // alignSelf: 'center',
                      marginLeft: h(0.5),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                      }}>
                        <View>
                      <Text
                        style={{
                          color: '#000',
                          opacity: 0.7,
                          fontSize: h(1.3),
                          marginRight: h(5.5)
                          // fontFamily: fonts.semiBold,
                        }}>
                        {moment(eventItem.eventStartDate).format('LL')}
                      </Text>
                      </View>
                      <View>
                      <Text
                        style={{
                          color: '#000',
                          opacity: 0.7,
                          fontSize: h(1.3),
                          // fontFamily: fonts.semiBold,
                        }}>
                        {eventItem.eventStartTime}
                      </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        color: '#000',
                        marginTop: h(0.5),
                        fontSize: h(1.6),
                        // fontFamily: fonts.semiBold,
                      }}>
                      {eventItem.eventName}
                    </Text>
                    <Text
                      multiline={true}
                      style={{
                        color: '#000',
                        marginTop: h(0.5),
                        opacity: 0.7,
                        fontSize: h(1.3),
                        maxWidth: w(36),
                        // fontFamily: fonts.semiBold,
                      }}>
                      {eventItem.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        <Text
          style={{
            color: '#000',
            fontSize: h(2),
            // fontFamily: fonts.semiBold,
            paddingLeft: h(2.5),
            marginVertical: h(2), fontWeight: 'bold'
          }}>
          Upcoming events
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {this.state.upcomingEventList != undefined &&
            this.state.upcomingEventList.map((upcomingeventItem, upcomingeventIndex) => (
              <View key={upcomingeventIndex}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom:20
                  }}>
                  <View>
                    <Image
                      style={styles.upcomingEventImage}
                      source={require('../../assets/assest/Stuff/emotion-4676000_1920.jpg')}
                      resizeMode="cover"
                    />
                    <View style={styles.upcomingEventView}>
                      <Text
                        style={{
                          color: '#000',
                          marginTop: h(0.5),
                          fontSize: h(1.9),
                          // fontFamily: fonts.semiBold,
                        }}>
                        {upcomingeventItem.eventName}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          opacity: 0.5,
                          marginTop: h(0.5),
                          fontSize: h(1.6),
                          // fontFamily: fonts.semiBold,
                        }}>
                        {upcomingeventItem.address}
                      </Text>

                    </View>
                  </View>

                </View>
              </View>
            ))}
        </ScrollView>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allevents: state.allevents,
    upcomingevents: state.upcomingevents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AlleventCall: (data) => dispatch(alleventsAPI(data)),
    UpcomingeventCall: (data) => dispatch(upcomingeventsAPI(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
