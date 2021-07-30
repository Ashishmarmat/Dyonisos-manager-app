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
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';

const ReservationManagerData = [
    {
        EventImage: require('../../assets/assest/Stuff/restaurant.jpg'),
        EventName: 'Rock king Event 1',
        Address: 'North Little Rock, USA 72800',
        TotalTicket: '5000',
        BookTicket: '3000',
        AvailableTicket: '2000',
    },
    {
        EventImage: require('../../assets/assest/Stuff/audience-868074_1920.jpg'),
        EventName: 'Rock king Event 2',
        Address: 'North Little Rock, USA 72800',
        TotalTicket: '5000',
        BookTicket: '3000',
        AvailableTicket: '2000',
    },
    {
        EventImage: require('../../assets/assest/Stuff/restaurant.jpg'),
        EventName: 'Rock king Event 3',
        Address: 'North Little Rock, USA 72800',
        TotalTicket: '5000',
        BookTicket: '3000',
        AvailableTicket: '2000',
    },
    {
        EventImage: require('../../assets/assest/Stuff/audience-868074_1920.jpg'),
        EventName: 'Rock king Event 4',
        Address: 'North Little Rock, USA 72800',
        TotalTicket: '5000',
        BookTicket: '3000',
        AvailableTicket: '2000',
    },
];

class Reservation extends React.Component {

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
                            <Text style={styles.titleText}>Reservation manager</Text>
                        </View>
                        <View style={{
                            flex: 2
                        }}>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    {ReservationManagerData.map((item, i) => (

                        <View style={styles.cardView}>

                            <View style={{
                                flexDirection: "row",
                                // alignItems: "center",
                            }}>
                                <Image source={item.EventImage}
                                    style={styles.EventImageView}
                                    resizeMode='cover' />

                                <View style={{
                                    marginLeft: h(1)
                                }}>
                                    <Text style={styles.eventNameText}>
                                        {item.EventName}
                                    </Text>
                                    <Text style={styles.lightText}>
                                        {item.Address}
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop: h(3),
                                marginHorizontal: h(-2)
                            }}>
                                <Text style={styles.TicketsText}>Total{'\n'}Tickets</Text>
                                <Text style={styles.TicketsText}>Book{'\n'}Tickets</Text>
                                <Text style={styles.TicketsText}>Available{'\n'}Tickets</Text>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 1,
                                    marginTop: h(2),
                                    width: w(82),
                                    alignSelf: "center",
                                    opacity: 0.40
                                }}
                            />
                            <View style={{
                                flexDirection: "row",
                                marginTop: h(1),
                                marginHorizontal: h(-2)
                            }}>
                                <Text style={styles.cashText}>{item.TotalTicket}</Text>
                                <Text style={styles.cashText}>{item.BookTicket}</Text>
                                <Text style={styles.cashText}>{item.AvailableTicket} </Text>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
