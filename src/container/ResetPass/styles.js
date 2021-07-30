import {StyleSheet} from 'react-native';
import {w, h} from '../../utils/Dimensions';
import fonts from '../../theme/fonts';
import {Right} from 'native-base';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F9FC',
    //backgroundColor:'red'.
  },
  fixBackground: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  headerView: {
    alignItems: 'center',
  },
  headerImage: {
    tintColor: '#e84d67',
    height: h(20),
    width: w(100),
    resizeMode: 'contain',
    marginTop: h(4),
    alignSelf: 'center',
  },
  bckArrow: {
    marginHorizontal: h(1),
    marginVertical: h(2),
    tintColor: '#e84d67',
    height: h(4),
    width: h(4),
    resizeMode: 'contain',
  },
  signinText: {
    color: '#000',
    fontSize: h(3),
    // fontFamily: fonts.bold,
    fontWeight: 'bold',
    paddingLeft: h(2),
    paddingBottom: h(1),
    marginTop: h(5),
  },
  cardView: {
    padding: h(1),
    marginVertical: h(2),
    marginHorizontal: h(2),
    borderRadius: h(2),
    borderColor: '#ddd',
    elevation: 5,
    backgroundColor: '#fff',
  },
  UsernameText: {
    color: '#000',
    fontSize: h(1.9),
    // fontFamily: fonts.regularText,
    marginTop: h(1),
  },
  passwordHeading: {
    color: '#000',
    fontSize: h(1.9),
    // fontFamily: fonts.regularText,
    marginTop: h(1),
  },
  InputText: {
    fontSize: h(2),
    // fontFamily: fonts.lightText,
    width:"80%",
    // height:h(3)
  },
  passwordIconView: {
    tintColor: 'grey',
    height: h(3),
    width: h(3),
    backgroundColor: '#fff',
    resizeMode: 'contain',
    marginTop: h(-0.5),
  },
  eyeIcon: {
    tintColor: 'grey',
    height: h(2.5),
    width: h(2.5),
    backgroundColor: '#fff',
    resizeMode: 'contain',
    marginRight: h(1),
  },
  btnView: {
    backgroundColor: '#df396b',
    borderRadius: h(3),
    alignItems: 'center',
    justifyContent: 'center',
    height: h(8),
    marginHorizontal: h(2),
    marginVertical: h(1),
    borderColor: '#ddd',
    elevation: 5,
    
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: h(2.3),
    // fontFamily: fonts.bold,
    alignSelf: 'center',
  },
  signupText: {
    color: '#df396b',
    fontSize: h(2),
    // fontFamily: fonts.semiBold,
  },
});
