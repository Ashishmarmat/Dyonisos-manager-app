import {StyleSheet} from 'react-native';
import {w, h} from '../../utils/Dimensions';
import fonts from '../../theme/fonts';
import {Right} from 'native-base';
export default StyleSheet.create({
  maincontainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  menuIcon: {
    tintColor: '#fff',
    height: h(3.5),
    width: h(3.5),
  },
  headerImage: {
    height: h(18),
    width: w(100),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  headingText: {
    color: '#fff',
    fontSize: h(2.8),
    // fontFamily: fonts.semiBold,
  },
  cardView: {
    marginTop: h(-6),
    padding: h(2),
    backgroundColor: '#fff',
    height: h(85),
    borderRadius: h(2),
    marginHorizontal: h(2),
    alignContent: 'center',
  },
  userImage: {
    height: h(14),
    width: h(14),
    alignSelf: 'center',
    borderRadius: h(2),
    // right: h(2),
  },
  regularText: {
    color: '#000',
    fontSize: h(1.8),
    // fontFamily: fonts.regularText,
    marginLeft: h(0.5),
    marginBottom: h(-0.4),
  },
  boldText: {
    color: '#000',
    fontSize: h(2),
    marginTop:h(1),
    // fontFamily: fonts.semiBold,
  },
  lightText: {
    color: 'grey',
    fontSize: h(1.9),
    // fontFamily: fonts.semiBold,
    opacity: 0.7,
    marginVertical:Platform.OS === 'ios' ? h(0.5) : h(-1.2),
  },
  btnView: {
    backgroundColor: '#df396b',
    borderRadius: h(2),
    alignSelf: 'center',
    justifyContent: 'center',
    height: h(8),
    width:'90%',
    marginHorizontal: h(2),
    borderColor: '#ddd',
    elevation: 5,
    position: 'absolute',
    bottom: 30,
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: h(2.2),
    // fontFamily: fonts.bold,
    alignSelf: 'center',
  },
});
