import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
// import {Actions} from 'react-native-router-flux';
import styles from './styles';
import menuIcon from '../../assets/icon/icon-menu.png';
import backIcon from '../../assets/icon/arrow.png';

export const Header = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.menuIconView}
          onPress={() => Actions.drawerOpen()}>
          <Image
            resizeMode="contain"
            style={styles.menuIconStyle}
            source={menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleTextView}>
          <Text style={styles.titleText}>Your Sites</Text>
        </View>
        <View style={styles.blankview}></View>
      </View>
    </View>
  );
};

export const HeaderWithGoBack = (title, customStyle = {}) => {
  return (
    <View style={[styles.mainContainer, { customStyle }]}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.menuIconView}
          onPress={() => Actions.pop()}>
          <Image
            resizeMode="contain"
            style={styles.backImgStyle}
            source={backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleTextView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.blankview}></View>
      </View>
    </View>
  );
};

export const HeaderWithRightIcon = (title, customStyle = {}) => {
  return (
    <View style={[styles.mainContainer, { customStyle }]}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.menuIconView}
          onPress={() => Actions.pop()}>
          <Image
            resizeMode="contain"
            style={styles.backImgStyle}
            source={backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleTextView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.blankview}>
          <TouchableOpacity
            onPress={() => Actions.CreateActionPlan()}
            style={{
              height: 20,
              width: 20,
              borderRadius: 20 / 2,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'grey',
              marginTop: -2
            }}>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
