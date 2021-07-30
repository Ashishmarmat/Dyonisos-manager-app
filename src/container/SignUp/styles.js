import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts'
import { Right } from 'native-base';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },
  headerImage: {
    tintColor: '#e84d67',
    height: '32%',
    width:'32%',
    resizeMode: 'contain',
    marginTop:h(-2),
    alignSelf: "center"
  },
  signinText: {
    color: "#000",
    fontSize: h(2.8),
    // //: fonts.bold,
    paddingLeft: h(2),
    marginTop:h(-2),
    paddingBottom: h(1),
  },
  cardView: {
    padding: h(1),
    marginVertical: h(1.5),
    marginHorizontal: h(2),
    borderRadius: h(2),
    borderColor: '#ddd',
    elevation: 5,
    backgroundColor: "#fff",
  },
  UsernameText: {
    color: "#000",
    fontSize: h(2),
    // //: fonts.regularText,
    paddingLeft:h(1),
    marginTop:h(0.5)
  },
  InputText: {
    fontSize: h(2),
    // //: fonts.lightText,
    width:'85%',
    maxHeight:h(8),
    marginVertical:Platform.OS === 'ios' ? h(0.5) : h(-1.2),
  },
  userIconView: {
    tintColor: "grey",
    height: h(3.2),
    width: h(3.2),
    backgroundColor: "#fff",
    resizeMode: "contain",
    marginLeft:h(1)
  },
  passwordIconView: {
    tintColor: "grey",
    height: h(3.2),
    width: h(3.2),
    backgroundColor: "#fff",
    resizeMode: "contain",
    marginTop: h(-1),
    marginLeft:h(1)

  },
  eyeIcon: {
    tintColor: "grey",
    height: h(2.5),
    width: h(2.5),
    backgroundColor: "#fff",
    resizeMode: "contain",
    right: h(1),
    // marginBottom:h(2)
  },
  CountryText: {
    color: 'gray',
    opacity: 0.65,
    fontSize: h(2),
    padding: h(1),
  },
  btnView: {
    backgroundColor: '#df396b',
    borderRadius: h(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: h(7),
    marginHorizontal: h(2),
    marginVertical: h(1),
    borderColor: '#ddd',
    elevation: 5,
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: h(2.2),
    //: fonts.bold,
    alignSelf: 'center',
  },
  socialMediaText: {
    color: "#000",
    fontSize: h(1.8),
    // fontFamily: fonts.lightText,
    alignSelf: "center",
    marginVertical:h(1)
  },
  fbIcon: {
    height: h(10),
    width: w(48),
    resizeMode: "contain",
  },
  signupText: {
    color: '#df396b',
    fontSize: h(1.8),
    //: fonts.semiBold,
    marginVertical:h(1)
  },
});