import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
 
    mainContainer: {
        flex: 1,
        backgroundColor: "#f7f6fb",
    },
    headerImage: {
        height: h(12),
        width: w(100),
        resizeMode: 'cover',
        alignSelf: "center",
    },
    bckArrow: {
        tintColor: "#fff",
        height: h(4),
        width: h(4),
        resizeMode: "contain",
    },
    headingText: {
        color: "#fff",
        fontSize: h(2.8),
        // fontFamily: fonts.semiBold,
        alignSelf: "center",
        alignItems: "center",
    },
    restaurantImage: {
        height: h(30),
        width: w(90),
        resizeMode: 'cover',
        marginTop: h(2),
        alignSelf: "center",
        elevation: 2,
        borderColor: '#ddd',
        borderTopLeftRadius: h(2),
        borderTopRightRadius: h(2)
    },
    cardView: {
        padding: h(1.5),
        // height: h(44),
        width: w(90),
        alignSelf: "center",
        borderBottomLeftRadius: h(2),
        borderBottomRightRadius: h(2),
        borderColor: '#ddd',
        elevation: 2,
        backgroundColor: "#fff",
        bottom:h(1)
    },
    headerBoldText: {
        color: "#000",
        fontSize: h(2.5),
        // fontFamily: fonts.bold,
    },
    lightText: {
        color: "gray",
        fontSize: h(1.7),
        // fontFamily: fonts.lightText,
    },
    normalText: {
        color: "#000",
        fontSize: h(1.9),
        // fontFamily: fonts.regularText,
        alignSelf: "center"
    },
    hostImage: {
        height: h(6),
        width: h(6),
        borderRadius: h(6 / 2),
        marginRight: h(1),
        alignItems: "center",
        alignSelf: "center"
    },
    semiBoldText: {
        color: "#000",
        fontSize: h(2),
        // fontFamily: fonts.semiBold,
    },
    userNameText: {
        color: "#000",
        fontSize: h(1.9),
        // fontFamily: fonts.semiBold,
        // alignSelf: "center"
    },
    locationIcon: {
        height: h(3.5),
        width: h(3.5),
        alignSelf: "center"
    },
    onMapText: {
        color: "#df396b",
        fontSize: h(1.8),
        // fontFamily: fonts.semiBold,
        alignSelf: "center"
    },
    timeLightText: {
        color: "gray",
        fontSize: h(1.7),
        // fontFamily: fonts.lightText,
    },
    desText: {
        color: "gray",
        fontSize: h(1.7),
        // fontFamily: fonts.lightText,
    }
});