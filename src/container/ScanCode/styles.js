import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
    // mainContainer: {
    //     backgroundColor: "#edf0f6",
    // },
    bckArrow: {
        tintColor: "#df396b",
        height: h(4),
        width: h(4),
        marginLeft: h(1),
        marginTop: h(1.5)
    },
    Container: {
        flex: 1,
        padding: h(1),
        borderTopLeftRadius: h(4),
        borderTopRightRadius: h(4),
        backgroundColor: "#fff",
        flexDirection: "column",
        // marginTop: h(5),
    },
    ScanIcon: {
        height: h(35),
        width: h(35),
        alignSelf: "center",
    },
    btnView: {
        backgroundColor: '#df396b',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        height: h(8),
        width:'92%',
        marginHorizontal: h(2),
        marginVertical: h(1),
        borderColor: '#ddd',
        elevation: 5,
        position:"absolute",
        bottom:10
    },
    btnTextStyle: {
        color: '#fff',
        fontSize: h(2.5),
        // fontFamily: fonts.semiBold,
        alignSelf: 'center',
    },
});