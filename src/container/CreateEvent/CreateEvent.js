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
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createeventAPI } from '../../actions/CreateEvent';
import { uploadImageApi } from '../../actions/UpdatePro';
import { categorylistAPI } from '../../actions/CategoryList';
import { subcategorylistAPI } from '../../actions/CategoryList';
import { sponsorslistAPI } from '../../actions/SponsorsList';
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import Loader from '../../constants/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown-deprecated-support';
import Modal from 'react-native-modal';

let statusArray = [
  {
    id: '1',
    eventStatus: 'Active',
  },
  {
    id: '2',
    eventStatus: 'Done',
  },
];
let TypeArray = [
  {
    id: '1',
    eventType: 'Free',
  },
  {
    id: '2',
    eventType: 'Paid',
  },
];
let tempEventImagesArray = [
  {
    localPath: require('../../assets/assest/assest/icon-01-01.png'),
    name: 'Item name',
  },
];

let SelectSponsor = [];

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starCount: 3,
      resourcePath: {},
      token: '',
      managerId: '',
      managerName: '',
      eventName: '',
      address: '',
      eventVenue: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      eventDetails: '',
      eventImg: [],
      fileName: '',
      ticketPrice: '',
      totalTickets: '',
      categoryName: '',
      showTime: false,
      showTime2: false,
      mode: 'date',
      date: new Date(1598051730000),
      selectedTime: '',
      categoryList: [],
      ticketSellingEndDate: '',
      ticketSellingStartDate: '',
      subCategoryList: [],
      subCategoryName: '',
      uploadedEventImages: [],
      sponsorsList: [],
      isModalVisible: false,
      userId: '',
      eventSponsors: [],
      SelectSponsor:[],
      tempEventImagesArray:[]
    };
  }
  categoryList() {
    this.setState({
      categoryList: value,
    });
  }
  subCategoryList() {
    this.setState({
      subCategoryList: value,
    });
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  bydefaultSponsorImage(sponsorsListItem) {
    if (
      this.state.image === '' ||
      this.state.image === null ||
      this.state.image === []
    ) {
      return require('../../assets/assest/Stuff/managerPro.png');
    } else {
      return {
        uri: sponsorsListItem.image,
      };
    }
  }
  componentWillMount = async () => {
    var token = await AsyncStorage.getItem('token');
    var managerId = await AsyncStorage.getItem('managerId');
    var managerName = await AsyncStorage.getItem('username');
    var managerImage = await AsyncStorage.getItem('image');
    var eventName = "";
    var eventStartDate = "";
    var eventStartTime = "";
    var eventEndDate = "";
    var eventEndTime = "";
    var eventVenue = "";
    var address = "";
    var eventDetails = "";
    var eventImg = "";
    var ticketPrice = "";
    var totalTickets = "";
    var categoryName = "";
    var subCategoryName = "";
    var ticketSellingStartDate = "";
    var ticketSellingEndDate = "";
    var eventType = "";
    var eventStatus = "";
    var eventSponsors = "";
    this.setState({
      token: token,
      managerId: managerId,
      managerName: managerName,
      managerImage: managerImage,
      eventName: eventName,
      eventStartDate: eventStartDate,
      eventStartTime: eventStartTime,
      eventDetails: eventDetails,
      eventImg: eventImg,
      ticketPrice: ticketPrice,
      totalTickets: totalTickets,
      eventEndDate: eventEndDate,
      eventEndTime: eventEndTime,
      eventVenue: eventVenue,
      address: address,
      categoryName: categoryName,
      subCategoryName: subCategoryName,
      ticketSellingStartDate: ticketSellingStartDate,
      ticketSellingEndDate: ticketSellingEndDate,
      eventType: eventType,
      eventStatus: eventStatus,
      eventSponsors: eventSponsors
    });
    this.props.categorylistCall({ token: this.state.token });
    this.props.sponsorslistCall({ managerId: this.state.managerId });
  };
  componentWillReceiveProps = async (nextProps) => {
    console.log('nextProps', nextProps);
    this.setState({
      isLoading: false,
    });
    if (nextProps.navigation.state.params) {
      if (nextProps.navigation.state.params.selectedAddressHome) {
        this.setState({
          eventVenue: nextProps.navigation.state.params.selectedAddressHome
        })
      }
    }
    if (nextProps.categorylist) {
      if (nextProps.categorylist.success === true) {
        this.setState({
          categoryList: nextProps.categorylist.data,
        });
      }
    }
    if (nextProps.subcategorylist) {
      if (nextProps.subcategorylist.success === true) {
        this.setState({
          subCategoryList: nextProps.subcategorylist.data,
        });
      }
    }
    if (nextProps.UploadImage && this.state.upload == 'upload') {
      if (nextProps.UploadImage) {
        const path = nextProps.UploadImage.fileName;
        const name = path && path.split('/');
        tempArray.push({ name: name[name.length - 1], path: path });
        this.setState(
          {
            fileName: tempArray,
          },
          () => {
            console.log('eventImg receiveprops', this.state.name);
          },
        );
      }
    }

    if (nextProps.sponsorslist) {
      if (nextProps.sponsorslist.success === true) {
        var abc = []
        for (let item of nextProps.sponsorslist.data) {
          item.value = false;
          abc.push(item)
        }
        // console.log('abc',abc);
        this.setState({
          sponsorsList: abc,
        });
      }
    }
    if (nextProps.createevent) {
      if (
        nextProps.createevent.success === true &&
        nextProps.createevent.success !== this.props.createevent.success
      ) {
        Alert.alert('Event created successfully ');
        Actions.AllEvents();
      }
    }
  };
  chooseFile = () => {
    console.log('chooseFile');
    var options = {
      quality: 0.8,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;
        console.log('source', source);
        this.setState({ fileName: source.path });
        this.uploadImage(source);
      }
    });
  };
  uploadImage = async (imagevalue) => {
    var data = new FormData();
    data.append('photo', {
      uri: imagevalue.uri,
      type: imagevalue.type,
      name: imagevalue.fileName,
    });
    console.log('img_data', data);
    fetch(`http://138.68.103.248:3000/api/FileUpload`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
        if (res.success == 'True') {
          tempEventImagesArray.unshift(res.file_data[0]);
          this.setState(
            {
              eventImg: res.file_data[0].filename,
              uploadedEventImages: tempEventImagesArray,
            },
            () => {
              console.log(
                'uploadedEventImages',
                this.state.uploadedEventImages,
              );
            },
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
 

  CreateEventbtn = async () => {
    console.log('submit click');
    if (this.state.eventName == '' || this.state.eventName == null) {
      Alert.alert('Please enter event name');
    } else if (this.state.address == '' || this.state.address == null) {
      Alert.alert('Please enter event Address');
    } else if (
      this.state.categoryName == '' ||
      this.state.categoryName == null
    ) {
      Alert.alert('Please enter Category name');
    } else if (
      this.state.subCategoryName == '' ||
      this.state.subCategoryName == null
    ) {
      Alert.alert('Please enter Sub category name');
    } else if (
      this.state.eventStartDate == '' ||
      this.state.eventStartDate == null
    ) {
      Alert.alert('Please enter event start date');
    } else if (
      this.state.eventStartTime == '' ||
      this.state.eventStartTime == null
    ) {
      Alert.alert('Please enter event start time');
    } else if (
      this.state.eventEndDate == '' ||
      this.state.eventEndDate == null
    ) {
      Alert.alert('Please enter event end date');
    } else if (
      this.state.eventEndTime == '' ||
      this.state.eventEndTime == null
    ) {
      Alert.alert('Please enter event end time');
    } else if (
      this.state.eventDetails == '' ||
      this.state.eventDetails == null
    ) {
      Alert.alert('Please enter event description');
    } else if (this.state.ticketPrice == '' || this.state.ticketPrice == null) {
      this.setState({
        ticketPrice: '0',
      });
    } else if (
      this.state.totalTickets == '' ||
      this.state.totalTickets == null
    ) {
      Alert.alert('Please enter Total tickets');
    } else if (
      this.state.ticketSellingStartDate == '' ||
      this.state.ticketSellingStartDate == null
    ) {
      Alert.alert('Please tickets selling start date');
    } else if (
      this.state.ticketSellingEndDate == '' ||
      this.state.ticketSellingEndDate == null
    ) {
      Alert.alert('Please select tickets selling end date');
    } else if (this.state.eventStatus == '' || this.state.eventStatus == null) {
      Alert.alert('Please select event status');
    } else if (this.state.eventType == '' || this.state.eventType == null) {
      Alert.alert('Please select event type');
    } else {
      let payload = {
        token: this.state.token,
        managerId: this.state.managerId,
        managerName: this.state.managerName,
        managerImage: this.state.managerImage,
        categoryName: this.state.categoryName,
        subCategoryName: this.state.subCategoryName,
        eventName: this.state.eventName,
        eventDetails: this.state.eventDetails,
        eventStartDate: this.state.eventStartDate,
        eventStartTime: this.state.eventStartTime,
        eventEndDate: this.state.eventEndDate,
        eventEndTime: this.state.eventStartTime,
        eventVenue: this.state.eventVenue,
        address: this.state.address,
        eventType: this.state.eventType,
        totalTickets: this.state.totalTickets,
        ticketPrice: this.state.ticketPrice,
        ticketSellingStartDate: this.state.ticketSellingStartDate,
        ticketSellingEndDate: this.state.ticketSellingEndDate,
        eventSponsors: SelectSponsor,
        eventImg: tempEventImagesArray,
        lat: 123,
        lng: 456,
      };
      this.props.submitForm(payload);
      this.setState({
        isLoading: true,
      });
    }
  };
  ///////////////////////////////time picker start ///////////////////////////////////////////////
  showTimepicker = () => {
    this.timeShow('time');
  };
  showEndTimepicker = () => {
    this.timeShow2('time');
  };
  timeShow = (currentMode) => {
    this.setState({
      showTime: true,
      mode: currentMode,
    });
  };
  timeShow2 = (currentMode) => {
    this.setState({
      showTime2: true,
      mode: currentMode,
    });
  };
  onchangeTime = (time, value) => {
    console.log('value', value);
    console.log('time', time);
    let eventStartTime = moment(value).format('LT');
    this.setState({
      eventStartTime: eventStartTime,
      showTime: false,
    });
  };
  onchangeEndTime = (time, value) => {
    console.log('value', value);
    console.log('time', time);
    let eventEndTime = moment(value).format('LT');
    this.setState({
      eventEndTime: eventEndTime,
      showTime2: false,
    });
  };

  ///////////////////////////////time picker end ///////////////////////////////////////////////

  onchangeStartDate = (date, value) => {
    console.log('value', value);
    console.log('date', date);
    const eventStartDate = moment(value).format('YYYY-MM-DD');
    this.setState({
      eventStartDate: eventStartDate,
    });
  };
  onchangeEndDate = (date, value2) => {
    console.log('value2', value2);
    console.log('date', date);
    const eventEndDate = moment(value2).format('YYYY-MM-DD');
    this.setState({
      eventEndDate: eventEndDate,
    });
  };
  ///////////////////////////////////////////////////////////////
  onchangeTcktStrt = (date, value) => {
    console.log('value', value);
    console.log('date', date);
    const ticketSellingStartDate = moment(value).format('YYYY-MM-DD');

    this.setState({
      ticketSellingStartDate: ticketSellingStartDate,
    });
  };
  onchangeTcktEnd = (date, value2) => {
    console.log('value2', value2);
    console.log('date', date);
    const ticketSellingEndDate = moment(value2).format('YYYY-MM-DD');

    this.setState({
      ticketSellingEndDate: ticketSellingEndDate,
    });
  };
  /////////////////////////////////////////////////////////////////////////////
  displaystatus = (data) => {
    return (
      <Text style={{ padding: 7, backgroundColor: '#fff' }}>
        {data.eventStatus}
      </Text>
    );
  };

  selectStatus = (idx, value) => {
    this.setState({
      eventStatus: value.eventStatus,
    });
  };
  ////////////////////////////////////////////////////////////////
  displayCategory = (data) => {
    return (
      <Text style={{ padding: 7, backgroundColor: '#fff' }}>
        {data.categoryName}
      </Text>
    );
  };

  selectCategory = (idx, value) => {
    this.setState({
      categoryName: value.categoryName,
      subCategoryName: '',
    });
    this.props.subcategorylistCall({ id: value._id });
  };
  //////////////////////////////////////////////////////////////////
  displaySubCategory = (data) => {
    return (
      <Text style={{ padding: 7, backgroundColor: '#fff' }}>
        {data.subCategoryName}
      </Text>
    );
  };

  selectSubCategory = (idx, value) => {
    this.setState({
      subCategoryName: value.subCategoryName,
    });
  };
  //////////////////////////////////////////////////////////////////////
  displayType = (data) => {
    return (
      <Text style={{ padding: 7, backgroundColor: '#fff' }}>
        {data.eventType}
      </Text>
    );
  };

  selectType = (idx, value) => {
    this.setState({
      eventType: value.eventType,
    });
  };
  ///////////////////////////////////////////////////////////

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  selectSponsors = (sponsorsListItem) => {
    console.log('sponsorsListItem@@@@@', sponsorsListItem)
    sponsorsListItem.value = true;
    SelectSponsor.push(sponsorsListItem)
    this.setState({
      isModalVisible: false,
    });
  };

  onSelectSponsor = (idx, value) => {
    var value = false;
    this.setState({
      eventSponsors: value.eventSponsors,
    });
  };
  removeSponsor = (spoImg, j) => {
    SelectSponsor.splice(j, 1)
    if (this.state.uiRender == false) {
      this.setState({ uiRender: true });
    } else {
      this.setState({
        uiRender: false,
      });
    }
    console.log("SelectSponsor", SelectSponsor);
  };
  removeEventImg = (filename, i) => {
    tempEventImagesArray.splice(i, 1)
    if (this.state.uiRender == false) {
      this.setState({ uiRender: true });
    } else {
      this.setState({
        uiRender: false,
      });
    }
    console.log("tempEventImagesArray", tempEventImagesArray);
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
              <Text style={styles.headingText}>Create event</Text>
            </View>
            <View
              style={{
                flex: 2,
              }}></View>
          </View>
        </ImageBackground>
        <ScrollView style={styles.Container}>
          <Text style={styles.titleText}>Event title</Text>
          <View style={styles.cardView}>
            <TextInput
              style={styles.InputText}
              autoCapitalize="words"
              placeholder="Enter event name"
              onChangeText={(eventName) =>
                this.setState({ eventName: eventName })
              }
              value={this.state.eventName}
            />
          </View>
          <Text style={styles.titleText}>Event address</Text>
          <View style={styles.cardView}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.InputText1}
                autoCapitalize="none"
                placeholder="Search places"
                onChangeText={(eventVenue) =>
                  this.setState({ eventVenue: eventVenue })
                }
                value={this.state.eventVenue}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('GoogleMap', { screenName: "Home" })}
                style={{
                  alignSelf: 'center'
                }}>
                <Image
                  source={require('../../assets/assest/assest/icon-05.png')}
                  style={styles.locationIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardView}>
            <TextInput
              style={styles.InputText}
              autoCapitalize="none"
              placeholder="Enter complete event address"
              onChangeText={(address) =>
                this.setState({ address: address })
              }
              value={this.state.address}
            />
          </View>
          <View style={styles.desCardView}>
            <TextInput
              style={styles.InputText}
              multiline={true}
              placeholder="How to reach (Optional)"
            />
          </View>
          <View>
            <Text style={styles.titleText}>Select Category</Text>
            <ModalDropdown
              style={{
                height: h(6),
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: h(2),
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: h(1),
                borderRadius: h(1.5),
              }}
              dropdownStyle={{
                width: '85%',
                height: h(22),
                marginTop: h(-5),
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              dropdownTextStyle={{
                color: '#000',
                fontSize: 14,
              }}
              options={this.state.categoryList}
              renderRow={(row) => this.displayCategory(row)}
              onSelect={(idx, value) => this.selectCategory(idx, value)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: h(2.3),
                    width: w(85),
                    padding: h(1),
                  }}>
                  {this.state.categoryName == '' ||
                    this.state.categoryName == null ||
                    this.state.categoryName == undefined
                    ? 'Select category'
                    : this.state.categoryName}
                </Text>
                <Image
                  source={require('../../assets/assest/assest/icon-04.png')}
                  style={{
                    height: h(3),
                    width: h(3),
                    marginTop: h(1),
                  }}
                  resizeMode="contain"
                />
              </View>
            </ModalDropdown>
          </View>
          <View>
            <Text style={styles.titleText}>Sub catogory</Text>
            <ModalDropdown
              style={{
                height: h(6),
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: h(2),
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: h(1),
                borderRadius: h(1.5),
              }}
              dropdownStyle={{
                width: '85%',
                height: h(22),
                marginTop: h(-5),
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              dropdownTextStyle={{
                color: '#000',
                fontSize: 14,
              }}
              options={this.state.subCategoryList}
              renderRow={(row) => this.displaySubCategory(row)}
              onSelect={(idx, value) => this.selectSubCategory(idx, value)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: h(2.3),
                    width: w(85),
                    padding: h(1),
                  }}>
                  {this.state.subCategoryName == '' ||
                    this.state.subCategoryName == null ||
                    this.state.subCategoryName == undefined
                    ? 'Select sub category'
                    : this.state.subCategoryName}
                </Text>
                <Image
                  source={require('../../assets/assest/assest/icon-04.png')}
                  style={{
                    height: h(3),
                    width: h(3),
                    marginTop: h(1),
                  }}
                  resizeMode="contain"
                />
              </View>
            </ModalDropdown>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: h(5) }}>
              <Text style={styles.titleText}> Event start date</Text>
              <DatePicker
                style={{
                  width: w(40),
                  marginTop: h(1),
                  backgroundColor: '#fff',
                  borderRadius: h(1.5),
                  borderColor: '#ddd',
                  elevation: 1,
                }}
                date={this.state.eventStartDate}
                mode="date"
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
                minDate={moment().toDate()}
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: h(1),
                    height: h(3.5),
                    width: h(3.5),
                  },
                  dateInput: {
                    flex: 1,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0,
                  },
                }}
                onDateChange={(date, value, eventStartDate) => {
                  {
                    this.setState({
                      eventStartDate: eventStartDate,
                    });
                  }
                  this.onchangeStartDate(date, value, eventStartDate);
                }}
                value={this.state.eventStartDate}
              />
            </View>
            <View>
              <Text style={styles.titleText}> Event end date</Text>
              <DatePicker
                style={{
                  width: w(40),
                  marginTop: h(1),
                  backgroundColor: '#fff',
                  borderRadius: h(1.5),
                  borderColor: '#ddd',
                  elevation: 1,
                }}
                date={this.state.eventEndDate}
                mode="date"
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
                minDate={this.state.eventStartDate}
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: h(1),
                    height: h(3.5),
                    width: h(3.5),
                  },
                  dateInput: {
                    flex: 1,
                    // height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0,
                  },
                }}
                onDateChange={(date, value, eventEndDate) => {
                  {
                    this.setState({
                      eventEndDate: eventEndDate,
                    });
                  }
                  this.onchangeEndDate(date, value, eventEndDate);
                }}
                value={this.state.eventEndDate}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: h(5) }}>
              <View>
                <Text style={styles.titleText}>Event start time</Text>
                <View style={styles.dateCardView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.InputTime}
                      onPress={() => this.showTimepicker()}>
                      <Image
                        source={require('../../assets/assest/assest/assest/icon-06.png')}
                        style={styles.ClockIcon}
                      />
                      <TextInput
                        style={{
                          fontSize: h(2),
                          color: '#000',
                          opacity: 0.7,
                          marginLeft: h(2),
                        }}
                        placeholder="9:00 AM"
                        editable={false}>
                        {this.state.eventStartTime}
                      </TextInput>
                    </TouchableOpacity>
                    {this.state.showTime && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={(time, value, eventStartTime) => {
                          this.setState({
                            eventStartTime: eventStartTime,
                            showTime: false,
                          });
                          this.onchangeTime(time, value, eventStartTime);
                          console.log(onchangeTime);
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.titleText}>Event end time</Text>
              <View style={styles.dateCardView}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.InputTime}
                    onPress={() => this.showEndTimepicker()}>
                    <Image
                      source={require('../../assets/assest/assest/assest/icon-06.png')}
                      style={styles.ClockIcon}
                    />
                    <TextInput
                      style={{
                        fontSize: h(2),
                        color: '#000',
                        opacity: 0.7,
                        marginLeft: h(2),
                      }}
                      placeholder="9:00 AM"
                      editable={false}>
                      {this.state.eventEndTime}
                    </TextInput>
                  </TouchableOpacity>
                  {this.state.showTime2 && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={(time, value, eventEndTime) => {
                        this.setState({
                          eventEndTime: eventEndTime,
                          showTime2: false,
                        });
                        this.onchangeEndTime(time, value, eventEndTime);
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.titleText}>Event description</Text>
          <View style={styles.desCardView}>
            <TextInput
              style={styles.InputText}
              multiline={true}
              onChangeText={(eventDetails) =>
                this.setState({ eventDetails: eventDetails })
              }
              value={this.state.eventDetails}
            />
          </View>
          <Text style={styles.titleText}>Add sponsor</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: h(1),
              }}>
              {
                SelectSponsor.length == 0 ?
                  <Image
                    source={require('../../assets/assest/Stuff/managerPro.png')}
                    style={{
                      height: h(5),
                      width: h(5),
                      borderRadius: h(5),
                    }} />
                  :
                  SelectSponsor.map((spoImg,item, j) =>
                    <ImageBackground
                      imageStyle={{
                        borderRadius: h(10),
                      }}
                      style={{
                        height: h(5),
                        width: h(5),
                      }}
                      source={{ uri: spoImg.image }}>
                      <TouchableOpacity
                         onPress={() => this.removeSponsor(item.spoImg, j)}
                        style={{
                          position: 'absolute',
                          height: h(2),
                          width: h(2),
                          backgroundColor: '#fff',
                          borderRadius: h(100),
                          borderWidth: h(0.05),
                          top: -4,
                          // left: -1,
                        }}>
                        <Text
                          style={{
                            color: "#df396b",
                            fontSize: h(1.6),
                            textAlign: "center",
                            marginTop: h(-.25)
                          }}>
                          x
                          </Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  )
              }
            </View>
            <TouchableOpacity onPress={this.toggleModal}>
              <Image
                source={require('../../assets/assest/assest/icon-01-02.png')}
                style={styles.plusIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.titleText}>Add event image</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: h(2),
            }}>
            <FlatList
              data={
                this.state.uploadedEventImages.length > 0
                  ? this.state.uploadedEventImages
                  : tempEventImagesArray
              }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index,i) => index.toString()}
              renderItem={({ item, index,i }) => (
                <View style={{ height: h(6.5), width: h(6.5) }}>
                  {item.filename && item.filename !== '' ? (
                    <ImageBackground
                      imageStyle={{
                        borderRadius: h(1.5),
                      }}
                      style={styles.addMoreImage}
                      source={{ uri: item.filename }}>
                      <TouchableOpacity
                        onPress={() => this.removeEventImg(item.filename, i)}
                        style={{
                          position: "absolute",
                          height: h(2.2),
                          width: h(2.2),
                          backgroundColor: "#fff",
                          borderRadius: h(100),
                          borderWidth: h(0.05),
                        }}
                      >
                        <Text
                          style={{
                            color: "#df396b",
                            fontSize: h(1.6),
                            textAlign: "center",
                            marginTop: h(-.25)
                            // alignSelf: "center",
                          }}
                        >
                          x
                          </Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                      <TouchableOpacity
                        onPress={this.chooseFile}>
                        <Image
                          style={styles.addMoreImage}
                          source={item.localPath}
                        />
                      </TouchableOpacity>
                    )}
                </View>
              )}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Event type</Text>
            <ModalDropdown
              style={{
                height: h(6),
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: h(2),
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: h(1),
                borderRadius: h(1.5),
              }}
              dropdownStyle={{
                width: '85%',
                height: h(14),
                padding: h(2),
                marginTop: h(-10),
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              dropdownTextStyle={{
                color: '#000',
                fontSize: 14,
              }}
              options={TypeArray}
              renderRow={(row) => this.displayType(row)}
              onSelect={(idx, value) => this.selectType(idx, value)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: h(2.3),
                    width: w(85),
                    padding: h(1),
                  }}>
                  {this.state.eventType == '' ||
                    this.state.eventType == '' ||
                    this.state.eventType == undefined
                    ? 'Select event type'
                    : this.state.eventType}
                </Text>
                <Image
                  source={require('../../assets/assest/assest/icon-04.png')}
                  style={{
                    height: h(3),
                    width: h(3),
                    marginTop: h(1),
                  }}
                  resizeMode="contain"
                />
              </View>
            </ModalDropdown>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: h(5) }}>
              <Text style={styles.titleText}>Total ticket</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.addAmountView}>
                  <TextInput
                    style={styles.AmountInputText}
                    keyboardType="numeric"
                    onChangeText={(totalTickets) =>
                      this.setState({ totalTickets: totalTickets })
                    }
                    value={this.state.totalTickets}
                  />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.titleText}>Ticket price</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.addAmountView}>
                    <Text
                      style={{
                        fontSize: h(2.2),
                        alignSelf: 'center',
                        paddingLeft: h(1.5),
                        color: 'gray',
                      }}>
                      $
                    </Text>
                    <TextInput
                      style={styles.AmountInputText}
                      keyboardType="numeric"
                      onChangeText={(ticketPrice) =>
                        this.setState({ ticketPrice: ticketPrice })
                      }
                      value={this.state.ticketPrice}
                      editable={this.state.eventType === 'Paid' ? true : false}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: h(5) }}>
              <Text style={styles.titleText}>Ticket selling start date</Text>
              <DatePicker
                style={{
                  width: w(40),
                  marginTop: h(1),
                  backgroundColor: '#fff',
                  borderRadius: h(1.5),
                  borderColor: '#ddd',
                  elevation: 1,
                }}
                borderWidth={0}
                date={this.state.ticketSellingStartDate}
                mode="date"
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
                minDate={moment().toDate()}
                maxDate={this.state.eventStartDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: h(1),
                    height: h(3.5),
                    width: h(3.5),
                  },
                  dateInput: {
                    flex: 1,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0,
                  },
                }}
                onDateChange={(date, value, ticketSellingStartDate) => {
                  {
                    this.setState({
                      ticketSellingStartDate: ticketSellingStartDate,
                    });
                  }
                  this.onchangeTcktStrt(date, value, ticketSellingStartDate);
                }}
                value={this.state.ticketSellingStartDate}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Ticket selling end date</Text>
              <DatePicker
                style={{
                  width: w(40),
                  marginTop: h(1),
                  backgroundColor: '#fff',
                  borderRadius: h(1.5),
                  borderColor: '#ddd',
                  elevation: 1,
                }}
                date={this.state.ticketSellingEndDate}
                mode="date"
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
                minDate={this.state.eventStartDate}
                maxDate={this.state.eventEndDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: h(1),
                    height: h(3.5),
                    width: h(3.5),
                  },
                  dateInput: {
                    flex: 1,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0,
                  },
                }}
                onDateChange={(date, value, ticketSellingEndDate) => {
                  {
                    this.setState({
                      ticketSellingEndDate: ticketSellingEndDate,
                    });
                  }
                  this.onchangeTcktEnd(date, value, ticketSellingEndDate);
                }}
                value={this.state.ticketSellingEndDate}
              />
            </View>
          </View>
          <Text style={styles.titleText}>Event status</Text>
          <ModalDropdown
            style={{
              height: h(6),
              width: '100%',
              backgroundColor: '#fff',
              paddingHorizontal: h(2),
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: h(1),
              borderRadius: h(1.5),
            }}
            dropdownStyle={{
              width: '85%',
              height: h(12),
              padding: h(2),
              marginTop: h(-10),
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            dropdownTextStyle={{
              color: '#000',
              fontSize: 14,
            }}
            options={statusArray}
            renderRow={(row) => this.displaystatus(row)}
            onSelect={(idx, value) => this.selectStatus(idx, value)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: h(2.3),
                  width: w(85),
                  padding: h(1),
                }}>
                {this.state.eventStatus == '' ||
                  this.state.eventStatus == null ||
                  this.state.eventStatus == undefined
                  ? 'Select event status'
                  : this.state.eventStatus}
              </Text>
              <Image
                source={require('../../assets/assest/assest/icon-04.png')}
                style={{
                  height: h(3),
                  width: h(3),
                  marginTop: h(1),
                }}
                resizeMode="contain"
              />
            </View>
          </ModalDropdown>
          <TouchableOpacity
            onPress={() => this.CreateEventbtn()}
            style={styles.btnView}>
            <Text style={styles.btnTextStyle}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}>
          <View
            style={{
              backgroundColor: '#fff',
              minHeight: 250,
              width: '80%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#fff',
              marginTop: 80,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: h(2.5),
                color: '#fff',
                textAlign: 'center',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                // marginTop: h(0.5),
                backgroundColor: '#df396b',
              }}>
              Sponsors List
            </Text>
            {this.state.sponsorsList != undefined &&
              this.state.sponsorsList.map(
                (sponsorsListItem, sponsorsListIndex) => (
                  <View key={sponsorsListIndex}>
                    <TouchableOpacity
                      onPress={() => sponsorsListItem.value == false ? this.selectSponsors(sponsorsListItem) : null}
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: h(2),
                        alignItems: 'center',
                        marginTop: h(1),
                      }}>
                      <Image
                        style={{
                          height: h(4),
                          width: h(4),
                          borderRadius: h(5),
                        }}
                        source={this.bydefaultSponsorImage(sponsorsListItem)}
                        resizeMode="cover"
                      />
                      <Text
                        style={{
                          fontSize: h(2),
                          textAlign: 'center',
                          marginHorizontal: h(2),
                        }}>
                        {sponsorsListItem.userName}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        width: w(66),
                        marginTop: h(0.5),
                        alignSelf: 'center',
                        opacity: 0.4,
                      }}
                    />
                  </View>
                ),
              )}
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    createevent: state.createevent,
    UploadImage: state.UploadImage,
    categorylist: state.categorylist,
    subcategorylist: state.subcategorylist,
    sponsorslist: state.sponsorslist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitFormImage: (data) => dispatch(uploadImageApi(data)),
    submitForm: (data) => dispatch(createeventAPI(data)),
    categorylistCall: (data) => dispatch(categorylistAPI(data)),
    subcategorylistCall: (data) => dispatch(subcategorylistAPI(data)),
    sponsorslistCall: (data) => dispatch(sponsorslistAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
