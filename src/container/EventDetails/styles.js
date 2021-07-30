import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f7f6fb"
    },
    headerView: {
        alignItems: "center"
    },
    headerImage: {
        height: h(38),
        width:'100%',
        resizeMode: 'cover',
        marginTop: h(-12),
        alignSelf: "center",
    },
    bckArrow: {
        tintColor: "#fff",
        height: h(4),
        width: h(4),
        resizeMode: "contain",
        marginLeft:h(1)
    },
    headingText: {
        color: "#fff",
        fontSize: h(2.8),
        fontWeight: "bold",
        //: fonts.semiBold,
        textAlign:"center",
        alignSelf: "center",
        alignItems: "center",
    },
    cardView: {
        padding: h(1),
        height: h(85),
        marginTop: h(5.5),
        marginHorizontal: h(2),
        borderRadius: 15,
        borderColor: '#ddd',
        elevation: 10,
        backgroundColor: "#fff",
    },
    headerBoldText: {
        color: "#000",
        fontSize: h(2.5),
        //: fonts.semiBold,
    },
    lightText: {
        color: "gray",
        fontSize: h(1.7),
        //: fonts.lightText,
        marginTop: h(1)
    },
    normalText: {
        color: "#000",
        fontSize: h(1.9),
        //: fonts.regularText,
        alignSelf: "center"
    },
    hostImage: {
        height: h(3.5),
        width: h(3.5),
        borderRadius: h(3.5 / 2),
        marginHorizontal: h(1),
        alignItems: "center",
        alignSelf:"center"
    },
    semiBoldText:{
        color: "#000",
        fontSize: h(1.8),
        //: fonts.semiBold,
        // marginBottom:h(1)
    },
    dateText:{
        color: "gray",
        fontSize: h(1.6),
        marginVertical:h(1)
    },
    userNameText: {
        color: "#df396b",
        fontSize: h(1.9),
        //: fonts.regularText,
        alignSelf: "center"
    },
    locationIcon: {
        height: h(3.5),
        width: h(3.5),
        alignSelf: "center"
    },
    onMapText: {
        color: "#df396b",
        fontSize: h(1.9),
        //: fonts.semiBold,
        alignSelf: "center"
    },
    cardDetailView: {
        padding: h(1.5),
        // height: h(11.5),
        marginVertical: h(1),
        borderRadius: 15,
        borderColor: '#ddd',
        elevation: 5,
        backgroundColor: "#f7f6fb",
    },
    timeLightText:{
        color: "gray",
        fontSize: h(1.6),
        //: fonts.lightText,
    },
    CashText: {
        color: "#000",
        fontSize: h(3.3),
        //: fonts.bold,
        marginVertical: h(1)
    },
    TagsView:{
        color: "#000",
        fontSize: h(2),
        //: fonts.semiBold,
        padding:h(2)
    },
    EventbtnView: {
        backgroundColor: '#df396b',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: h(6),
        width:w(29),
        marginHorizontal: h(1),
        borderColor: '#ddd',
        elevation: 5,
    },
    EventbtnTextStyle: {
        color: '#fff',
        fontSize: h(2),
        //: fonts.regularText,
        alignSelf: 'center',
    },
    desText:{
        color: "gray",
        fontSize: h(1.6),
        //: fonts.lightText,
        // marginHorizontal:h(2),
        marginTop:h(.5)
    },
    ReservebtnView: {
        backgroundColor: '#df396b',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        height: h(8),
        width:w(94),
        marginHorizontal: h(1),
        marginVertical:h(2),
        borderColor: '#ddd',
        elevation: 5,
    },
    ReservebtnTextStyle: {
        color: '#fff',
        fontSize: h(2.2),
        //: fonts.semiBold,
        alignSelf: 'center',
    },
});