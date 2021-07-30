import React from 'react';
import { View, Animated, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import splashImg from '../../assets/assest/assest/splashscreen-01.png';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      manager_id: ""
    }
  }

  componentDidMount = async () => {
    const loginCred = await AsyncStorage.getItem('managerId');
    this.setState({
      manager_id:loginCred
    })

    try {
      setTimeout(async () => {
        if (this.state.manager_id === null) {
          //Actions.Login();
         this.props.navigation.navigate('Login')
        }
        else {
          //Actions.Sites();
         this.props.navigation.navigate('Home')
        }

      }, 1500);
    } 
    catch (error) {
      console.log('error' + error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Image resizeMode='cover' source={splashImg} style={styles.splashImg} />
      </View>
    );
  }
}

export default connect(null, null)(Splash);