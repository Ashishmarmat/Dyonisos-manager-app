import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import fonts from '../../theme/fonts';
import { Right } from 'native-base';
export default StyleSheet.create({
  maincontainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  menuIcon: {
    tintColor: '#fff',
    height: h(4.5),
    width: h(4.5),
  },
  headerImage: {
    height: h(35),
    width: w(100),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  headingText: {
    color: '#fff',
    fontSize: h(2.8),
    // fontFamily: fonts.semiBold,
    alignSelf: 'center',
    marginTop: h(5),
  },
  Touchableview: {
    flexDirection: 'row',
    height: h(8),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TypesOfEventList: {
    color: '#fff',
    fontSize: h(1.8),
    // fontFamily: fonts.semiBold,
    marginHorizontal: h(1),
  },
  cardView: {
    padding: h(2),
  },
  lightText: {
    color: '#fff',
    fontSize: h(1.7),
    opacity: 0.8,
    // fontFamily: fonts.lightText,
  },
  headerBoldText: {
    color: '#fff',
    fontSize: h(2.5),
    // fontFamily: fonts.semiBold,
  },
  restaurantImage: {
    height: h(23),
    width: w(92),
    marginTop: h(-10),
    alignSelf: 'center',
    borderRadius: h(2),
  },
  partyImage: {
    height: h(10),
    width: h(10),
    borderRadius: h(2),
  },
  InputText: {
    fontSize: h(2),
    // fontFamily: fonts.lightText,
    width: '90%',
    paddingLeft: h(3),
    paddingTop:h(1.5)
  },
  upcomingEventView: {
    marginLeft: h(2),
    backgroundColor: '#fff',
    height: h(12),
    width: h(20),
    borderBottomLeftRadius: h(2),
    borderBottomRightRadius: h(2),
    paddingLeft: h(2),
  },
  upcomingEventImage: {
    marginLeft: h(2),
    height: h(10),
    width: h(20),
    borderTopLeftRadius: h(2),
    borderTopRightRadius: h(2),
  },
});
