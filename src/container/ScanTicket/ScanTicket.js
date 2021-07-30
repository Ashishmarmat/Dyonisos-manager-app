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
    TextInput,
    ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginAPI } from "../../actions/Login";
import { sidescreenAPI } from "../../actions/SideScreen";
import styles from './styles';
import { w, h } from '../../utils/Dimensions';
import { TextSize } from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings'
import fonts from '../../theme/fonts'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';


class ScanTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    componentWillMount = async () => {

    }

    componentWillReceiveProps = async (nextProps) => {

    }
    handleOnPress(value) {
        this.setState({ value: value })
        console.log("value", this.state.value)
    }

    render() {

        return (

            <SafeAreaView style={styles.mainContainer}>
                <Loader loading={this.state.isLoading} />
                <StatusBar />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        source={require('../../assets/assest/assest/icon-16.png')}
                        style={styles.bckArrow}
                    />
                </TouchableOpacity>
                <View style={{
                    marginTop: h(12)
                }}>
                    <ImageBackground
                        source={require('../../assets/assest/assest/assest/scan_img1-01-01.png')}
                        style={styles.layoutView}
                        resizeMode="contain"
                    >
                        <Image
                            source={require('../../assets/assest/assest/assest/img-01-0111.png')}
                            style={styles.ScanIcon}
                            resizeMode="contain"
                        />
                    </ImageBackground>
                </View>
                <Text style={{
                    color: '#000',
                    fontSize: h(2.7),
                    // fontFamily: fonts.bold,
                    alignSelf: 'center',
                    marginTop: h(10)
                }}>
                    Welcome to Dyonisos scan
                        </Text>
                <Text style={{
                    color: 'gray',
                    padding: h(1.5),
                    fontSize: h(1.9),
                    // fontFamily: fonts.lightText,
                    textAlign: 'center',
                }}>
                    loream ipsum dolor sit amet, loream ipsum dolor sit amet consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod tincidunt
                        </Text>
                <TouchableOpacity
                    onPress={() => Actions.ScanCode()}
                    style={styles.btnView}>
                    <Text
                        style={styles.btnTextStyle}>
                        Let's Get Started
                             </Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
};

const mapStateToProps = (state) => {

    return {
        login: state.login,
        sidescreen: state.sidescreen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (data) => dispatch(loginAPI(data)),
        HomeScreenApi: (data) => dispatch(sidescreenAPI(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanTicket);
