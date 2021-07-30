import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
    maincontainer: {
        backgroundColor: "#f2f2f2",
        flex: 1
    },
    menuIcon: {
        tintColor: "#fff",
        height: h(4),
        width: h(4),
    },
    headerImage: {
        height: h(20),
        width: w(100),
        resizeMode: 'cover',
        alignSelf: "center",
    },
    headingText: {
        color: "#fff",
        fontSize: h(3),
        // fontFamily: fonts.semiBold,
        padding: h(1),
    },
    cardView: {
        marginTop: h(-7),
        padding: h(2),
        backgroundColor: "#fff",
        minHeight: h(22),
        borderRadius: h(2),
        marginHorizontal: h(2),
        alignContent: "center"
    },
    userImage: {
        height: h(12),
        width: h(12),
        borderRadius: h(50),
        borderColor: '#cecece',
        borderWidth: h(0.2),
        borderRadius: h(50)
    },
    regularText: {
        color: "#000",
        fontSize: h(1.8),
        // fontFamily: fonts.regularText,
        marginLeft: h(0.5),
        marginBottom: h(-0.4)
    },
    boldText: {
        color: "#000",
        fontSize: h(2.2),
        // fontFamily: fonts.semiBold,
    },
    lightText: {
        color: "grey",
        fontSize: h(1.9),
        // fontFamily: fonts.semiBold,
        opacity: 0.7,
        marginTop: h(0.5)
    },
    categoryView: {
        backgroundColor: "#df396b",
        minHeight: h(10),
        width: w(35),
        borderRadius: h(2),
        padding: h(2),
        marginRight: h(2)
    },
    whiteText: {
        color: "#fff",
        marginTop: h(0.5),
        fontSize: h(2),
        // fontFamily: fonts.semiBold,
    },
    numOfTask: {
        color: "#fff",
        marginTop: h(0.5),
        fontSize: h(1.7),
        // fontFamily: fonts.lightText,
    },
    ExpireSoonDes: {
        color: "grey",
        fontSize: h(1.7),
        // fontFamily: fonts.semiBold,
        opacity: 0.7,
        marginLeft: h(1),
        width: w(70),
        alignSelf: "center",
    },
    numOfDays: {
        color: "grey",
        fontSize: h(1.8),
        // fontFamily: fonts.semiBold,
        opacity: 0.7,
        alignSelf: "center",
        marginHorizontal: h(0.5),
        width: '13%'
    },
    pinkImage: {
        height: h(3.5),
        width: w(2.5),
        alignSelf: "center",
        borderRadius: h(2)
    },
    rightArrow: {
        height: h(2),
        width: h(2),
        alignSelf: "center",
        tintColor: "grey"
    }
});