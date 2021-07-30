import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {uploadImageApi} from '../../actions/UpdatePro';
import {updatemanagerAPI} from '../../actions/UpdatePro';
import {deleteprofileAPI} from '../../actions/DeleteProfile';
import {w, h} from '../../utils/Dimensions';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

class UpdatePro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      starCount: 3,
      resourcePath: {},
      image: '',
      token: '',
      fileName: '',
      username: '',
      aboutMe: '',
      id: '',
    };
  }
  bydefaultImage() {
    if (this.state.image == '' || this.state.image == null) {
      return require('../../assets/assest/Stuff/managerPro.png');
    } else {
      return {
        uri: this.state.image,
      };
    }
  }
  componentWillMount = async () => {
    console.log('this.props', this.props);
    var id = await AsyncStorage.getItem('managerId');
    var username = await AsyncStorage.getItem('username');
    var aboutMe = await AsyncStorage.getItem('aboutMe');
    var image = await AsyncStorage.getItem('image');
    var contactNumber = await AsyncStorage.getItem('contactNumber');
    var address = await AsyncStorage.getItem('address');
    var token = await AsyncStorage.getItem('token');
    console.log('id', id);

    this.setState({
      id: id,
      username: username,
      aboutMe: aboutMe,
      image: image,
      contactNumber: contactNumber,
      address: address,
      token:token
    });
  };

  componentWillReceiveProps = async (nextProps) => {
    console.log('UpdateProfileNextProps', nextProps);
    this.setState({
      isLoading: false,
    });
    if (nextProps.UploadImage && this.state.upload == 'upload') {
      if (nextProps.UploadImage) {
        const path = nextProps.UploadImage.fileName;
        const name = path && path.split('/');
        tempArray.push({name: name[name.length - 1], path: path});
        this.setState(
          {
            fileName: tempArray,
          },
          () => {
            console.log('image', this.state.name);
          },
        );
      }
    }
    if (nextProps.updatemanager) {
      if (
        nextProps.updatemanager.success === true &&
        nextProps.updatemanager.success !== this.props.updatemanager.success
      ) {
        Alert.alert('Your profile update successfully');
        Actions.Me();
      }
    }
    if (nextProps.deleteprofile) {
      if (nextProps.deleteprofile.success === true) {
        Alert.alert('Your account deleted successfully');
        Actions.Login();
      }
    }
  };

  // ----------------------------Image Picker----------------------------------------------------//
  chooseFile = () => {
    var options = {
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
        this.setState({fileName: source.path});
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
          this.setState(
            {
              image: res.file_data[0].filename,
            },
            () => {
              console.log('xxxxx', this.state.image);
            },
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updateProfile = async () => {
    console.log('updateProfile click');
    if (this.state.username == '' || this.state.username == null) {
      Alert.alert('Please enter your Name');
      return false;
    } else if (this.state.aboutMe == '' || this.state.aboutMe == null) {
      Alert.alert('Please enter about you');
      return false;
    } else if (
      this.state.contactNumber == '' ||
      this.state.contactNumber == null
    ) {
      Alert.alert('Please enter your contactNumber');
      return false;
    } else if (this.state.address == '' || this.state.address == null) {
      Alert.alert('Please enter your address');
      return false;
    } else {
      let payload = {
        id: this.state.id,
        username: this.state.username,
        aboutMe: this.state.aboutMe,
        image: this.state.image,
        contactNumber: this.state.contactNumber,
        address: this.state.address,
        token:this.state.token
      };
      console.log('payload', payload);
      this.props.submitForm(payload);
      this.setState({
        isLoading: true,
      });
    }
  };
  // DeleteProfileBtn = async () => {
  //   const id = await AsyncStorage.getItem('managerId');
  //   console.log('this.state.id', this.state.id);
  //   let payload = {
  //     id: this.state.id,
  //   };
  //   console.log('payload', payload);
  //   this.props.deleteprofileForm(payload);
  //   this.setState({
  //     isLoading: true,
  //   });
  // };
  render() {
    const {navigation} = this.props;
    const prevScreen =
      navigation &&
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.prevScreen;
    return (
      <SafeAreaView style={styles.maincontainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-40}>
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
                  marginTop: h(4),
                }}>
                <TouchableOpacity
                  disabled={prevScreen !== 'Signup' ? false : true}
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={{
                    flex: 2,
                    alignSelf: 'center',
                    paddingLeft: h(2),
                  }}>
                  {prevScreen !== 'Signup' ? (
                    <Image
                      style={styles.menuIcon}
                      source={require('../../assets/assest/assest/icon-16.png')}
                      resizeMode="contain"
                    />
                  ) : null}
                </TouchableOpacity>
                <View>
                  <Text style={styles.headingText}>Edit profile</Text>
                </View>
                <View style={{flex: 2}}></View>
              </View>
            </ImageBackground>
            <View style={styles.cardView}>
              <ImageBackground
                style={styles.userImage}
                imageStyle={{
                  borderRadius: h(2),
                  flex: 1,
                }}
                source={this.bydefaultImage()}
                resizeMode="cover">
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: h(10.5),
                    right: h(-1.6),
                  }}
                  onPress={() => this.chooseFile()}>
                  <Image
                    style={{
                      height: h(4),
                      width: h(4),
                    }}
                    source={require('../../assets/assest/assest/assest/edit-01.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </ImageBackground>

              <Text
                style={{
                  color: '#df396b',
                  fontSize: h(2.2),
                  marginTop: h(1.5),
                  alignSelf: 'center',
                  // fontFamily: fonts.semiBold,
                }}>
                Change Profile Photo
              </Text>
              <View
                style={{
                  marginTop: h(0.5),
                }}>
                <Text style={styles.boldText}>Name</Text>
                <TextInput
                  style={styles.lightText}
                  multiline={true}
                  onChangeText={(username) =>
                    this.setState({username: username})
                  }
                  value={this.state.username}
                  placeholder="Enter your name"
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: w(85),
                  // marginTop:h(-1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  marginTop: h(1),
                }}>
                <Text style={styles.boldText}>About me</Text>
                <TextInput
                  style={styles.lightText}
                  multiline={true}
                  onChangeText={(aboutMe) => this.setState({aboutMe: aboutMe})}
                  value={this.state.aboutMe}
                  placeholder="Write About you"
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: w(85),
                  // marginTop:h(-1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  marginTop: h(1),
                }}>
                <Text style={styles.boldText}>Contact number</Text>
                <TextInput
                  style={styles.lightText}
                  multiline={true}
                  keyboardType="numeric"
                  onChangeText={(contactNumber) =>
                    this.setState({contactNumber: contactNumber})
                  }
                  value={this.state.contactNumber}
                  placeholder="Contact number"
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: w(85),
                  // marginTop:h(-1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  marginTop: h(1),
                }}>
                <Text style={styles.boldText}>Address</Text>
                <TextInput
                  style={styles.lightText}
                  multiline={true}
                  onChangeText={(address) => this.setState({address: address})}
                  value={this.state.address}
                  placeholder="Enter your Address"
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: w(85),
                  // marginTop:h(-1),
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
            </View>
            <View style={{marginTop: h(6)}}>
              <TouchableOpacity
                onPress={() => this.updateProfile()}
                style={styles.btnView}>
                <Text style={styles.btnTextStyle}>Update profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => this.DeleteProfileBtn()}
                style={styles.DelBtnView}>
                <Text style={styles.DelbtnTextStyle}>Delete account</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    UploadImage: state.UploadImage,
    updatemanager: state.updatemanager,
    deleteprofile: state.deleteprofile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitFormImage: (data) => dispatch(uploadImageApi(data)),
    submitForm: (data) => dispatch(updatemanagerAPI(data)),
    deleteprofileForm: (data) => dispatch(deleteprofileAPI(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePro);
