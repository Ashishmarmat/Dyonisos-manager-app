import {StyleSheet, Dimensions} from 'react-native';
import {w, h} from '../../utils/Dimensions';
import {TextSize} from '../../theme/TextSize';
import {TextColor, UiColor} from '../../theme';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#df396b',
  },
  bckArrow: {
    tintColor: '#fff',
    height: h(3.5),
    width: h(3.5),
    resizeMode: 'contain',
    marginLeft: h(1),
  },
  headerText: {
    color: '#fff',
    fontSize: h(2.8),
    // fontFamily: fonts.semiBold,
    marginLeft: h(2),
  },
  drawerList: {
    height: h(120),
    backgroundColor: '#df396b',
  },
  minusIcon: {
    fontSize: h(2.8),
    color: '#fff',
    marginHorizontal: h(3),
  },
  inputIcon: {
    width: h(2.8),
    height: h(2.8),
    tintColor: '#fff',
    marginHorizontal: h(3),
  },
  drawerText: {
    fontSize: h(2.1),
    color: '#fff',
    // fontFamily: fonts.regularText,
    justifyContent: 'center',
  },
  drawerView: {
    flexDirection: 'row',
    marginVertical: h(1.8),
    alignItems: 'center',
  },
});
