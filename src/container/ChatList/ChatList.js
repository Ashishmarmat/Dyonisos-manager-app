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
    ImageBase
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


const ChatData = [
    {
        userImage: require('../../assets/assest/Stuff/entrepreneur.jpg'),
        userName: 'Jonde Ray',
        time: '3:09',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },
    {
        userImage: require('../../assets/assest/Stuff/fashion-1063100_1920.jpg'),
        userName: 'Emma Smith',
        time: '3:09',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },
    {
        userImage: require('../../assets/assest/Stuff/girl01.jpg'),
        userName: 'Isabella Row',
        time: '3:15',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },
    {
        userImage: require('../../assets/assest/Stuff/woman-1149911_1920.jpg'),
        userName: 'Sophia Jone',
        time: '3:23',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },
    {
        userImage: require('../../assets/assest/Stuff/model-2911363_1920.jpg'),
        userName: 'Mia Neo',
        time: '4:19',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },
    {
        userImage: require('../../assets/assest/Stuff/model-2911363_1920.jpg'),
        userName: 'Mia Neo',
        time: '4:19',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },
    {
        userImage: require('../../assets/assest/Stuff/model-2911363_1920.jpg'),
        userName: 'Mia Neo',
        time: '4:19',
        userDesc: 'Lorem ipsum dolor sit amet, tetuer adipiscing eli.'
    },

];

class ChatList extends React.Component {

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
                        borderBottomLeftRadius: h(3),
                        borderBottomRightRadius: h(3)
                    }}
                    source={require('../../assets/assest/assest/splashscreen-01-01.png')}
                    style={styles.headerImage}>
                    <Text style={styles.headingText}>Chat</Text>
                </ImageBackground>
                <ScrollView style={{ padding: h(2) }}>
                    {ChatData.map((item, i) => (
                        <TouchableOpacity
                            onPress={() => Actions.PersonalChat()}
                            style={styles.CardView}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                marginBottom: h(1)
                            }}>

                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Image source={item.userImage}
                                            style={{
                                                height: h(9),
                                                width: h(9),
                                                borderRadius: h(2),
                                                marginRight: h(1)
                                            }}
                                            resizeMode='cover' />
                                    </View>
                                    <View>
                                        <Text
                                            style={styles.userNameText}>
                                            {item.userName}
                                        </Text>
                                        <Text
                                            style={styles.userDescText}>
                                            {item.userDesc}
                                        </Text>
                                    </View>
                                </View>

                                <Text
                                    style={styles.timeText}>
                                    {item.time}
                                </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
