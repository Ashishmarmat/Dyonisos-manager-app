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
    StyleSheet
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
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';


const notificationData = [
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        userDesc: 'loream ipsum dolor sit amet, loream ipsum dolor sit amet consectetuer amet loream ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        userDesc: 'loream ipsum dolor sit amet, loream ipsum dolor sit amet consectetuer amet loream ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        userDesc: 'loream ipsum dolor sit amet, loream ipsum dolor sit amet consectetuer amet loream ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        time: '3:23',
        userDesc: 'loream ipsum dolor sit amet, loream ipsum dolor sit amet consectetuer amet loream ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        userDesc: 'loream ipsum dolor sit amet, loream ipsum dolor sit amet consectetuer amet loream ipsum dolor sit amet.'
    },

];

class Notification extends React.Component {

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
                <ImageBackground
                    imageStyle={{
                        borderBottomLeftRadius: h(2),
                        borderBottomRightRadius: h(2)
                    }}
                    source={require('../../assets/assest/assest/splashscreen-01-01.png')}
                    style={styles.headerImage}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        marginLeft: h(1),
                        marginBottom: h(-2),
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}
                            style={{
                                flex: 2
                            }}>
                            <Image
                                source={require('../../assets/assest/assest/icon-16.png')}
                                style={styles.bckArrow}
                            />
                        </TouchableOpacity>
                        <View style={{
                            flex: 2
                        }}>
                            <Text style={styles.headingText}>Notification</Text>
                        </View>
                        <View style={{
                            flex: 2
                        }}>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <Text style={styles.semiBoldText}>12 June 2020</Text>
                    {notificationData.map((item, i) => (
                        <TouchableOpacity
                            style={styles.CardView}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: h(1) }}>

                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Image source={item.userImage}
                                            style={styles.userImageView}
                                            resizeMode='cover' />
                                    </View>
                                    <Text
                                        style={styles.userDescText}>
                                        {item.userDesc}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <Text style={styles.semiBoldText}>10 June 2020</Text>
                    {notificationData.map((item, i) => (
                        <TouchableOpacity
                            style={styles.CardView}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: h(1) }}>

                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Image source={item.userImage}
                                            style={styles.userImageView}
                                            resizeMode='cover' />
                                    </View>
                                    <Text
                                        style={styles.userDescText}>
                                        {item.userDesc}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
