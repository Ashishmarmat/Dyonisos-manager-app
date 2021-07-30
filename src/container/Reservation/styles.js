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
    titleText: {
        color: "#fff",
        fontSize: h(2.8),
        // fontFamily: fonts.semiBold,
        alignSelf: "center",
        alignItems: "center",
    },
    eventNameText: {
        color: "#000",
        fontSize: h(2.2),
        // fontFamily: fonts.semiBold,
    },
    EventImageView: {
        height: h(8),
        width: h(8),
        resizeMode: 'cover',
        alignSelf: "center",
        elevation: 2,
        borderColor: '#ddd',
        borderRadius: h(2),
    },
    cardView: {
        padding: h(2),
        marginTop:h(2),
        minHeight: h(20),
        width: w(90),
        alignSelf: "center",
        borderRadius:h(2),
        borderColor: '#ddd',
        elevation: 5,
        backgroundColor: "#fff",
    },
    lightText: {
        color: "gray",
        fontSize: h(1.7),
        marginTop: h(1),
        // fontFamily: fonts.lightText,
    },
    locationIcon: {
        height: h(3.5),
        width: h(3.5),
        alignSelf: "center"
    },
    onMapText: {
        color: "#df396b",
        fontSize: h(1.9),
        // fontFamily: fonts.semiBold,
        alignSelf: "center"
    },
    TicketsText: {
        color: "#000",
        fontSize: h(1.8),
        // fontFamily: fonts.bold,
        textAlign:"center",
        flex:1
    },
    cashText:{
        color: "#df396b",
        fontSize: h(2),
        // fontFamily: fonts.bold,
        textAlign:"center",
        flex:1
    }
});