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
import { Container } from 'native-base';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';

const EventFeedbackData = [
    {
        userImage: require('../../assets/assest/Stuff/entrepreneur.jpg'),
        userName: 'Jonde Ray',
        desc: 'loream ipsum dolor sit amet, consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod tincidunt',
        date: '20 June 2020'
    },
    {
        userImage: require('../../assets/assest/Stuff/fashion-1063100_1920.jpg'),
        userName: 'Emma Smith',
        desc: 'loream ipsum dolor sit amet, consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod tincidunt',
        date: '10 June 2020'
    },
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        userName: 'Isabella Row',
        desc: 'loream ipsum dolor sit amet, consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod tincidunt',
        date: '5 June 2020'
    },
    {
        userImage: require('../../assets/assest/Stuff/woman-1149911_1920.jpg'),
        userName: 'Sophia jone',
        desc: 'loream ipsum dolor sit amet, consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod tincidunt',
        date: '25 May 2020'
    },
    {
        userImage: require('../../assets/assest/Stuff/entrepreneur.jpg'),
        userName: 'Jonde Ray',
        desc: 'loream ipsum dolor sit amet, consectetuer amet adicpiscing elit, seddiam nonummy nibh euismod tincidunt',
        date: '10 May 2020'
    },
];

class EventFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            starCount: 3
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    componentWillMount = async () => {

    }

    componentWillReceiveProps = async (nextProps) => {

    }

    handleOnPress(value) {
        this.setState({ value: value })
        console.log("value", this.state.value)
    }
    oncheckvalue = () => {

    }

    render() {

        return (

            <SafeAreaView style={styles.mainContainer}
                behavior="position"
                keyboardVerticalOffset={-150}>
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
                        }}>
                            <Text style={styles.titleText}>Event feedback</Text>
                        </View>
                        <View style={{
                            flex: 2
                        }}>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView style={{
                    padding: h(2)
                }}>
                    <Text style={{
                        color: "#000",
                        fontSize: h(2.4),
                        // fontFamily: fonts.bold,
                    }}>
                        Most Recent
                        </Text>
                    {EventFeedbackData.map((item, i) => (
                        <View>
                            <View style={{
                                flexDirection: "row",
                                marginTop: h(2),
                            }}>
                                <Image source={item.userImage}
                                    style={styles.userImageView}
                                    resizeMode='cover' />

                                <View style={{
                                    marginLeft: h(1)
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}>
                                        <Text style={styles.userNameText}>
                                            {item.userName}
                                        </Text>
                                        <Text style={styles.dateText}>
                                            {item.date}
                                        </Text>
                                    </View>
                                    <View style={{ height: h(2), width: h(10), marginVertical: h(1) }}>
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
                                    <Text style={styles.lightText}>
                                        {item.desc}
                                    </Text>
                                </View>

                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 1,
                                    marginTop: h(2),
                                    width: w(90),
                                    alignSelf: "center",
                                    opacity: 0.40
                                }}
                            />

                        </View>

                    ))}
                </ScrollView>
            </SafeAreaView >
        );
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(EventFeedback);
