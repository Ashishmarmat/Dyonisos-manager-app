import {StyleSheet} from 'react-native';
import {w, h} from '../../utils/Dimensions';
import fonts from '../../theme/fonts';
import {Right} from 'native-base';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  headerView: {
    alignItems: 'center',
  },
  headerImage: {
    tintColor: '#e84d67',
    height: '40%',
    width: '40%',
    resizeMode: 'contain',
    marginTop: h(2),
    alignSelf: 'center',
  },
  bckArrow: {
    marginTop: h(4),
    marginLeft: h(2),
    tintColor: '#e84d67',
    height: h(4),
    width: h(4),
    resizeMode: 'contain',
  },
  signinText: {
    color: '#000',
    fontSize: h(3),
    // //: fonts.bold,
    fontWeight: 'bold',
    paddingBottom: h(1),
  },
  cardView: {
    padding: h(1.5),
    // height: h(20),
    marginVertical: h(2),
    width: '100%',
    borderRadius: h(2),
    borderColor: '#ddd',
    elevation: 2,
    backgroundColor: '#fff',
  },
  UsernameText: {
    color: '#000',
    fontSize: h(1.9),
    // //: fonts.regularText,
    marginTop: h(1),
  },
  InputText: {
    fontSize: h(2),
    // //: fonts.lightText,
    width: w(70),
  },
  userIconView: {
    tintColor: 'grey',
    height: h(3.2),
    width: h(3.2),
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
  btnView: {
    backgroundColor: '#df396b',
    borderRadius: h(3),
    alignSelf: 'center',
    justifyContent: 'center',
    height: h(8),
    width: '100%',
    marginVertical: h(1),
    borderColor: '#ddd',
    elevation: 3,
    position: 'absolute',
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: h(2.3),
    // //: fonts.bold,
    alignSelf: 'center',
  },
});
