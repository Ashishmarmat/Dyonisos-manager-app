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
    ImageBackground,
    StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginAPI } from "../../actions/Login";
import { sidescreenAPI } from "../../actions/SideScreen";
import { w, h } from '../../utils/Dimensions';
import { TextSize } from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings'
import fonts from '../../theme/fonts'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';
import Today from './Today';
import All from './All';
import Fonts from '../../theme/fonts';


class ScanHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            TodayData: true,
            AllData: false
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

    DataShow(value) {
        console.log("value", value)
        if (value == "Today") {
            this.setState({
                TodayData: true,
                AllData: false
            })
        }
        else if (value == "All") {
            this.setState({
                TodayData: false,
                AllData: true
            })
        }
    }
    render() {

        return (

            <SafeAreaView style={styles.mainContainer}>
                <Loader loading={this.state.isLoading} />
                <StatusBar />
                <View style={styles.Container}>
                    <TouchableOpacity
                        onPress={() => Actions.ScanCode()}
                    >
                        <Image
                            source={require('../../assets/assest/assest/assest/scan_icon-4-02.png')}
                            style={{
                                height: h(4),
                                width: h(4),
                                marginLeft: h(1),
                                marginTop: h(1.5)
                            }} resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: '#000',
                        fontSize: h(2.7),
                        // fontFamily: fonts.bold,
                        alignSelf: 'center',
                        marginTop: h(2)
                    }}>
                        Scanning History
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

                    <View
                        style={styles.Touchableview}
                    >
                        <TouchableOpacity
                            onPress={() => this.DataShow("Today")}
                            style={[styles.TodayTouchable, { backgroundColor: this.state.TodayData == true ? '#df396b' : '#fff', }]}
                        >
                            <Text style={[styles.TodayText, { color: this.state.TodayData == true ? '#fff' : '#000', }]}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.DataShow("All")}
                            style={[styles.AllTouchable, { backgroundColor: this.state.AllData == true ? '#df396b' : '#fff', }]}
                        >
                            <Text style={[styles.AllText, { color: this.state.AllData == true ? '#fff' : '#000', }]}>All</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.TodayData == true &&
                        <Today />
                    }
                    {this.state.AllData == true &&
                        <All />
                    }
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    // mainContainer: {
    //     backgroundColor: "#edf0f6"
    // },
    Container: {
        // flex: 1,
        borderTopLeftRadius: h(4),
        borderTopRightRadius: h(4),
        backgroundColor: "#fff",
        flexDirection: "column",
        // marginTop: h(8)
    },
    Touchableview: {
        flexDirection: "row",
        height: h(7),
        marginTop: h(1.5),
        alignSelf: "center",
        alignItems: "center",
    },
    TodayTouchable: {
        height: h(7),
        width: w(25),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: h(5),
        marginRight: h(3),
        borderColor: '#E0E0E0',
        shadowOpacity: 0.37,
        elevation: 2,
    },
    AllTouchable: {
        height: h(7),
        width: w(25),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: h(5),
        borderColor: '#E0E0E0',
        shadowOpacity: 0.37,
        elevation: 2,

    },
    TodayText: {
        fontSize: h(2),
        // fontFamily: fonts.mediumText,

    },
    AllText: {
        fontSize: h(2),
        // fontFamily: fonts.mediumText,

    }

})
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanHistory);
