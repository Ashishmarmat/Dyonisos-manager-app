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
        height: h(10),
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
        fontWeight:"bold",
        alignSelf: "center",
        alignItems: "center",
    },
    headingText: {
        color: "#fff",
        fontSize: h(2.8),
        // fontFamily: fonts.semiBold,
        alignSelf: "center",
    },
    userImageView: {
        height: h(6),
        width: h(6),
        borderRadius: h(10),
        marginRight: h(1)
    },
    semiBoldText: {
        padding:h(2),
        color: "#000",
        fontSize: h(2),
       fontWeight:"bold",
    },
    CardView: {
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderRadius: h(2),
        shadowRadius: 7.49,
        elevation: 1,
        minHeight: h(9),
        padding: h(2),
        marginBottom: h(2),
        marginHorizontal: h(2)
    },
    userDescText: {
        color: '#000',
        opacity:0.5,
        fontSize: h(1.8),
        // fontFamily: fonts.lightText,
        width:'80%'
    },

});