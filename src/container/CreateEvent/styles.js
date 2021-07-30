import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        // backgroundColor: "#cecece",
    },
    Container: {
        padding: h(2)
    },
    headerView: {
        alignItems: "center"
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
        width: w(35),
        // fontFamily: fonts.semiBold,
        alignSelf: "center",
        alignItems: "center",
    },
    titleText: {
        color: "#000",
        fontSize: h(2),
        // fontFamily: fonts.bold,
        marginTop: h(1),
    },
    cardView: {
        height: h(6),
        borderRadius: h(1.5),
        borderColor: '#ddd',
        elevation: 1,
        backgroundColor: "#fff",
        marginTop: h(1),
        justifyContent: 'center',
    },
    dateCardView: {
        height: h(6),
        marginTop: h(1),
        borderRadius: h(1.5),
        borderColor: '#ddd',
        elevation: 1,
        backgroundColor: "#fff",
        justifyContent: "center"
    },
    desCardView: {
        minHeight: h(10),
        marginTop: h(1),
        borderRadius: h(1.5),
        borderColor: '#ddd',
        elevation: 1,
        backgroundColor: "#fff",
    },
    InputText: {
        paddingLeft: h(1),
        fontSize: h(1.8),
        width:'100%'
        // fontFamily: fonts.regularText,
    },
    InputText1: {
        paddingLeft: h(1),
        fontSize: h(1.8),
        width:'90%'
        // fontFamily: fonts.regularText,
    },
    InputTime: {
        flexDirection: 'row',
        alignSelf:'center',
        // fontFamily: fonts.regularText,
        width: w(40)
    },
    locationIcon: {
        height: h(3.5),
        width: h(3.5),
        alignSelf: "center",
        justifyContent:'center'
    },
    ClockIcon: {
        height: h(3.5),
        width: h(3.5),
        resizeMode: "contain",
        marginTop:h(1),
        marginHorizontal: h(1),
    },
    imageEvent: {
        height: h(6),
        width: h(6),
        borderRadius: h(1.5),
        resizeMode: "cover",
    },
    plusIcon: {
        height: h(4),
        width: h(4),
        marginRight: h(2)
    },
    addMoreImage: {
        height: h(6.5),
        width: h(6.5),
        borderRadius: h(1.5),
    },
    addAmountView: {
        height: h(6),
        width: w(40),
        borderRadius: h(1.5),
        borderColor: '#ddd',
        elevation: 2,
        backgroundColor: "#fff",
        marginTop: h(1),
        // justifyContent: 'center',
        flexDirection: 'row'
    },
    AmountInputText: {
        paddingLeft: h(1),
        fontSize: h(2.2),
        justifyContent: "center",
        width: '75%'
        // fontFamily: fonts.regularText,
    },
    freeTextView: {
        height: h(7),
        width: '45%',
        borderRadius: h(1.5),
        borderColor: '#ddd',
        elevation: 2,
        backgroundColor: "#df396b",
        marginTop: h(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    freeText: {
        color: '#fff',
        fontSize: h(2.2),
        // fontFamily: fonts.bold,
    },
    btnView: {
        backgroundColor: '#df396b',
        borderRadius: h(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        height: h(7),
        marginVertical: h(3),
        borderColor: '#ddd',
        elevation: 3,
        top: -10
    },
    btnTextStyle: {
        color: '#fff',
        fontSize: h(2.4),
        // fontFamily: fonts.bold,
        alignSelf: 'center',
    },
});