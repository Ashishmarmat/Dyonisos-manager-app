import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { vieweventAPI } from '../../actions/ViewEventDetails';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import Loader from '../../constants/Loader';
import Geolocation from '@react-native-community/geolocation';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      isLoading: false,
      starCount: 3,
      eventDetails: [],
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount = async (data) => {
    let managerName = await AsyncStorage.getItem('username');
    this.setState({
      managerName: managerName
    });
    console.log('componentDidMount this.props', this.props);
    const { navigation } = this.props;
    const eventIdFromNavigation =
      navigation &&
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.eventId;
    console.log(navigation, 'navigation');

    var eventId = "";
    console.log('eventId', eventId);
    this.setState(
      {
        eventId: eventId,
      },
      () => {
        const payLoad = {
          eventId: eventIdFromNavigation,
        };
        console.log('componentDidMount payLoad', payLoad);
        this.props.submitForm(payLoad);
      },
    );
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log('nextProps', nextProps);
    this.setState({
      isLoading: false,
    });
    if (nextProps.viewevent) {
      if (nextProps.viewevent.success === true) {
        this.setState({
          eventDetails: nextProps.viewevent.datalist,
        });
        console.log('eventdetail@@', nextProps.viewevent.datalist);
      }
    }
  };
  enableLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          isLoading: true,
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
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  };
  handleOnPress(value) {
    this.setState({ value: value });
    console.log('value', this.state.value);
  }
  bydefaultImage() {
    if (this.state.image === '') {
      return (
        require('../../assets/assest/Stuff/managerPro.png')
      )
    } else {
      return {
        uri: this.state.eventDetails.managerImage
      }
    }
  }
  // bydefaultEventImage() {
  //   if (this.state.eventImg === '') {
  //     return (
  //       require('../../assets/assest/Stuff/restaurant.jpg')
  //     )
  //   } else {
  //     return {
  //       uri: this.state.eventDetails.eventImg
  //     }
  //   }
  // }
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Loader loading={this.state.isLoading} />
        <StatusBar />
        <View style={styles.headerView}>
          <Image
            source={require('../../assets/assest/Stuff/restaurant.jpg')}
            //  source={this.bydefaultEventImage()}
            style={styles.headerImage}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: h(-20),
            marginLeft: h(1),
            marginBottom: h(1),
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                flex: 2,
              }}>
              <Image
                source={require('../../assets/assest/assest/icon-16.png')}
                style={styles.bckArrow}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 2,
            }}>
            <View
              style={{
                flex: 1,
              }}></View>
            <Text style={styles.headingText}>
              {this.state.eventDetails.eventName}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
            }}></View>
        </View>
        <ScrollView>
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.headerBoldText}>
                {this.state.eventDetails.eventName}
              </Text>
              <View
                style={{
                  height: h(4),
                  width: h(12),
                  marginTop: h(2),
                  marginRight: 9,
                }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.starCount}
                  starSize={15}
                  Icon={'fa-star'}
                  emptyStarColor="#f2f2f2"
                  fullStarColor="#ffc107"
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
            <Text style={styles.lightText}>
              {this.state.eventDetails.eventVenue}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: h(1.5),
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.normalText}>Hosted By</Text>
                <Image
                  source={this.bydefaultImage()}
                  style={styles.hostImage}
                />
                <Text style={styles.userNameText}>
                  {this.state.managerName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.enableLocation()}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fce6ef',
                  borderRadius: h(10),
                  height: h(4),
                  width: w(27),
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assets/assest/assest/icon-05.png')}
                  style={styles.locationIcon}
                />
                <Text style={styles.onMapText}>On Map</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardDetailView}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{ width: w(48) }}>
                  <Text style={styles.semiBoldText}>Event Start</Text>
                  <Text style={styles.dateText}>
                    {moment(this.state.eventDetails.eventStartDate).format('LL')}
                  </Text>
                  <Text style={styles.timeLightText}>
                    {this.state.eventDetails.eventStartTime}
                  </Text>
                </View>
                <View>
                  <Text style={styles.semiBoldText}>Event End</Text>
                  <Text style={styles.dateText}>
                    {moment(this.state.eventDetails.eventEndDate).format('LL')}
                  </Text>
                  <Text style={styles.timeLightText}>
                    {this.state.eventDetails.eventEndTime}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View style={{ marginTop: h(1) }}>
                <Text style={styles.semiBoldText}>Description</Text>
                <Text style={styles.desText}>
                  {this.state.eventDetails.eventDetails}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: h(1),
                }}>
                <View style={{ width: w(48) }}>
                  <Text style={styles.semiBoldText}>Event category</Text>
                  <Text style={styles.desText}>
                    {this.state.eventDetails.categoryName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.semiBoldText}>Event sub category</Text>
                  <Text style={styles.desText}>
                    {this.state.eventDetails.subCategoryName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: h(1),
                }}>
                <View style={{ width: w(48) }}>
                  <Text style={styles.semiBoldText}>Total tickets</Text>
                  <Text style={styles.desText}>
                    {this.state.eventDetails.totalTickets}
                  </Text>
                </View>
                <View>
                  <Text style={styles.semiBoldText}>Ticket price</Text>
                  <Text style={styles.desText}>
                    {this.state.eventDetails.ticketPrice}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: h(1),
                }}>
                <View style={{ width: w(48) }}>
                  <Text style={styles.semiBoldText}>
                    Ticket selling start date
                  </Text>
                  <Text style={styles.desText}>
                    {moment(this.state.eventDetails.ticketSellingStartDate).format('LL')}
                  </Text>
                </View>
                <View>
                  <Text style={styles.semiBoldText}>
                    Ticket selling end date
                  </Text>
                  <Text style={styles.desText}>
                    {moment(this.state.eventDetails.ticketSellingEndDate).format('LL')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View style={{ marginTop: h(1) }}>
                <Text style={styles.semiBoldText}>Event status</Text>
                {this.state.eventDetails.eventStatus === 0 ? (
                  <Text style={styles.desText}>Active</Text>
                ) : (
                    <Text style={styles.desText}>Done</Text>
                  )}
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View style={{ marginTop: h(1) }}>
                <Text style={styles.semiBoldText}>Event sponsors</Text>
                <View style={{ flexDirection: 'row', marginLeft: h(2), marginTop: h(1) }}>
                  {this.state.eventDetails.eventSponsors != undefined &&
                    this.state.eventDetails.eventSponsors.map((intItem, intIndex) => (
                      <Image
                        source={{ uri: intItem.image }}
                        style={{
                          height: h(4.5),
                          width: h(4.5),
                          borderRadius: h(5),
                          marginLeft: h(-1)
                        }}
                      />
                    ))}
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: .8,
                  width: w(85),
                  marginTop: h(1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    viewevent: state.viewevent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => dispatch(vieweventAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
