import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
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
    titleText: {
        color: "#fff",
        fontSize: h(2.8),
        // fontFamily: fonts.semiBold,
        alignSelf: "center",
        alignItems: "center",
    },
    userNameText: {
        color: "#000",
        fontSize: h(2),
        // fontFamily: fonts.semiBold,
    },
    userImageView: {
        height: h(9),
        width: h(9),
        resizeMode: 'cover',
        elevation: 2,
        borderColor: '#ddd',
        borderRadius: h(2),
    },
    lightText: {
        color: "gray",
        fontSize: h(1.9),
        // fontFamily: fonts.lightText,
        width:w(74)
    },
    dateText:{
        color: "gray",
        fontSize: h(1.9),
        // fontFamily: fonts.lightText,
    }
});