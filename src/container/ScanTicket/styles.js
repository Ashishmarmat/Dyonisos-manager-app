import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#edf0f6"
    },
    layoutView: {
        height: h(32),
        width: h(32),
        alignSelf: "center",
    },
    ScanIcon: {
        flex: 1,
        height: h(15),
        width: h(15),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        tintColor: "#df396b",
    },
    bckArrow: {
        tintColor: "#df396b",
        height: h(4),
        width: h(4),
        marginLeft: h(2),
        marginTop: h(4)
    },
    btnView: {
        backgroundColor: '#df396b',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        height: h(8),
        width:"92%",
        marginHorizontal: h(2),
        marginVertical: h(1),
        borderColor: '#ddd',
        elevation: 5,
        position:"absolute",
        bottom:32,
    },
    btnTextStyle: {
        color: '#fff',
        fontSize: h(2.5),
        // fontFamily: fonts.semiBold,
        alignSelf: 'center',
    },
});