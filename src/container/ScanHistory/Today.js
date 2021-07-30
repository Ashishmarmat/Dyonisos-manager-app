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
import { w, h } from '../../utils/Dimensions';
import { TextSize } from '../../theme/TextSize';
import Loader from '../../constants/Loader';
import strings from '../../utilities/strings'
import fonts from '../../theme/fonts'
import AsyncStorage from '@react-native-community/async-storage';
import { initDB, MasconSiteData, massconSiteList } from '../../database';


const scanHistoryData = [
    {
        userImage: require('../../assets/assest/assest/assest/icon_22-11.png'),
        scanID: '04432000008',
        userDesc: 'Lorem ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/assest/assest/icon_22-11.png'),
        scanID: '04432000008',
        userDesc: 'Lorem ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/assest/assest/icon_22-11.png'),
        scanID: '04432000008',
        userDesc: 'Lorem ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/assest/assest/icon_22-11.png'),
        scanID: '04432000008',
        time: '3:23',
        userDesc: 'Lorem ipsum dolor sit amet.'
    },
    {
        userImage: require('../../assets/assest/assest/assest/icon_22-11.png'),
        scanID: '04432000008',
        userDesc: 'Lorem ipsum dolor sit amet.'
    },

];

class Today extends React.Component {

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

                {scanHistoryData.map((item, i) => (
                    <View
                        style={styles.CardView}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: h(1) }}>

                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Image source={item.userImage}
                                        style={styles.scanImage}
                                        resizeMode='contain' />
                                </View>
                                <View style={{ alignSelf: "center" }}>
                                    <Text
                                        style={styles.scanIDText}>
                                        {item.scanID}
                                    </Text>
                                    <Text
                                        style={styles.userDescText}>
                                        {item.userDesc}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row",alignSelf:"center" }}>
                                <TouchableOpacity>
                                <Image
                                    source={require('../../assets/assest/assest/assest/deleteIcon.png')}
                                    style={{
                                        height: h(3),
                                        width: h(3),
                                        marginHorizontal:h(1.5)
                                    }} resizeMode="contain"
                                />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Image
                                    source={require('../../assets/assest/assest/assest/icon_23-02.png')}
                                    style={{
                                        height: h(3),
                                        width: h(3),
                                    }} resizeMode="contain"
                                />
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                ))}

            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        backgroundColor: "#fff",
    },
    headingText: {
        color: "#fff",
        fontSize: h(2.8),
        // fontFamily: fonts.semiBold,
        alignSelf: "center",
        marginTop: h(5)
    },
    scanImage: {
        tintColor: "#000",
        height: h(7),
        width: h(7),
        borderRadius: h(2),
        marginRight: h(1)
    },
    semiBoldText: {
        color: "#000",
        fontSize: h(2),
        // fontFamily: fonts.semiBold,
    },
    CardView: {
        marginTop: h(2),
        backgroundColor: '#f4f4f4',
        borderColor: '#E0E0E0',
        borderRadius: h(2),
        shadowRadius: 7.49,
        elevation: 1,
        minHeight: h(9),
        padding: h(1.5),
        marginVertical: h(1),
        marginHorizontal: h(2)
    },
    scanIDText: {
        color: '#000',
        fontSize: h(2.1),
        // fontFamily: fonts.semiBold,
    },
    userDescText: {
        color: '#000',
        fontSize: h(1.7),
        // fontFamily: fonts.lightText,
        width: w(50)
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(Today);
