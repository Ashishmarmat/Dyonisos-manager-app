import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import { TextColor, UiColor } from '../../theme';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
  },
  headerView: {
    flexDirection: "row",
    backgroundColor: '#434242',
    height: h(8),
  },
  menuIconView: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems:'center',
    // marginHorizontal: h(1),

  },
  menuIconStyle: {
    height: h(5),
    width: h(6),
    color: '#fff',
  },
  titleTextView: {
    flex: 3,
    justifyContent: 'center',
  },
  titleText: {
    fontSize:h(2.5),
    color: '#fff',
  },
  blankview: {
    flex: 0.7,
    alignItems:'center',
    justifyContent:'center'
  },
  backImgStyle:{
    height:h(4),
    width:h(4),
    tintColor:'#fff'
  }
});
