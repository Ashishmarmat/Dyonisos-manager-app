import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { w, h } from '../../utils/Dimensions';
import styles from './styles';
import { viewmanagerAPI } from '../../actions/ViewManager';
import AsyncStorage from '@react-native-community/async-storage';

class ManagerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starCount: 3,
      managerData: []
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  bydefaultImage() {
    if (this.state.image === '') {
      return (
        require('../../assets/assest/Stuff/managerPro.png')
      )
    } else {
      return {
        uri: this.state.managerData.image
      }
    }
  }
  
  componentDidMount = async () => {
    const id = await AsyncStorage.getItem('managerId')
    const username = await AsyncStorage.getItem('username')
    const aboutMe = await AsyncStorage.getItem('aboutMe')
    const image = await AsyncStorage.getItem('image')

    const data = {
      id: id,
      username: username,
      aboutMe: aboutMe,
      image: image
    }
    console.log("data", data)
    this.props.managerProfileCall(data)
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log("nextProps", nextProps);
    this.setState({
      isLoading: false
    })
    if (nextProps.ViewManager) {
      if (nextProps.ViewManager.success === true) {
        this.setState({
          managerData: nextProps.ViewManager.datalist
        })
      }
    }
  };
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
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
              justifyContent: 'space-between',
              marginTop: h(4),
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={{
                flex: 2,
                alignSelf: 'center',
                marginHorizontal: h(2),
              }}>
              <Image
                style={styles.menuIcon}
                source={require('../../assets/assest/assest/icon-16.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{ flex: 6 }}>
              <Text style={styles.headingText}>Manager profile</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.cardView}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.userImage}
              source={this.bydefaultImage()}
              resizeMode="cover"
            />
            <View style={{ marginLeft: h(2) }}>
              <Text
                style={{
                  color: '#df396b',
                  fontSize: h(2.5),
                  // fontFamily: fonts.semiBold,
                }}>
                {/* William Smith */}
                {this.state.managerData.username}
              </Text>
              <Text style={styles.lightText}>Event manager</Text>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: h(0.5),
                  }}>
                  <Text style={styles.boldText}>{this.state.managerData.eventCreated}</Text>
                  <Text style={styles.regularText}>Created</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: h(4),
                    marginTop: h(0.5),
                  }}>
                  <Text style={styles.boldText}>2</Text>
                  <Text style={styles.regularText}>Completed</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.lightText}>
              {/* loream ipsum dolor sit amet, consectetuer amet adicpiscing elit,
              seddiam amet nonummy nibh euismod tincidunt. */}
              {this.state.managerData.aboutMe}
            </Text>
          </View>
        </View>
        <ScrollView style={{ padding: h(2) }}>
          <Text
            style={{
              color: '#000',
              fontSize: h(2),
              // fontFamily: fonts.semiBold,
              marginVertical: h(2),
            }}>
            Category
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.categoryView}>
              <Text style={styles.whiteText}>Events</Text>
              <Text style={styles.numOfTask}>5 tasks</Text>
            </View>
            <View style={styles.categoryView}>
              <Text style={styles.whiteText}>To Do</Text>
              <Text style={styles.numOfTask}>17 tasks</Text>
            </View>
            <View style={styles.categoryView}>
              <Text style={styles.whiteText}>Events</Text>
              <Text style={styles.numOfTask}>5 tasks</Text>
            </View>
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: h(2),
              // fontFamily: fonts.semiBold,
              marginVertical: h(1.5),
            }}>
            Expire soon
          </Text>
          <View style={{ flexDirection: 'row', marginVertical: h(1.5) }}>
            <Image
              style={styles.pinkImage}
              source={require('../../assets/assest/assest/splashscreen-01-01.png')}
              resizeMode="cover"
            />
            <Text style={styles.ExpireSoonDes}>
              loream ipsum dolor sit amet elit, seddiam amet nonummy nibh
              euismod tincidunt.
            </Text>
            <Text style={styles.numOfDays}>1 day</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/assest/assest/rightArrow.png')}
              resizeMode="cover"
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: h(1) }}>
            <Image
              style={styles.pinkImage}
              source={require('../../assets/assest/assest/splashscreen-01-01.png')}
              resizeMode="cover"
            />
            <Text style={styles.ExpireSoonDes}>
              loream ipsum dolor sit amet elit, seddiam amet nonummy nibh
              euismod tincidunt.
            </Text>
            <Text style={styles.numOfDays}>10 day</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/assest/assest/rightArrow.png')}
              resizeMode="cover"
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: h(1.5) }}>
            <Image
              style={styles.pinkImage}
              source={require('../../assets/assest/assest/splashscreen-01-01.png')}
              resizeMode="cover"
            />
            <Text style={styles.ExpireSoonDes}>
              loream ipsum dolor sit amet elit, seddiam amet nonummy nibh
              euismod tincidunt.
            </Text>
            <Text style={styles.numOfDays}>15 day</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/assest/assest/rightArrow.png')}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: h(1.5),
            }}>
            <Image
              style={styles.pinkImage}
              source={require('../../assets/assest/assest/splashscreen-01-01.png')}
              resizeMode="cover"
            />
            <Text style={styles.ExpireSoonDes}>
              loream ipsum dolor sit amet elit, seddiam amet nonummy nibh
              euismod tincidunt.
            </Text>
            <Text style={styles.numOfDays}>25 day</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/assest/assest/rightArrow.png')}
              resizeMode="cover"
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: h(1.5) }}>
            <Image
              style={styles.pinkImage}
              source={require('../../assets/assest/assest/splashscreen-01-01.png')}
              resizeMode="cover"
            />
            <Text style={styles.ExpireSoonDes}>
              loream ipsum dolor sit amet elit, seddiam amet nonummy nibh
              euismod tincidunt.
            </Text>
            <Text style={styles.numOfDays}>25 day</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/assest/assest/rightArrow.png')}
              resizeMode="cover"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ViewManager: state.ViewManager,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    managerProfileCall: (data) => dispatch(viewmanagerAPI(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerProfile);
