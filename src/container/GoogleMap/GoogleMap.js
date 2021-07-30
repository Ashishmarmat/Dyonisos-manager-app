import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  Platform
} from 'react-native';
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { Actions } from 'react-native-router-flux';
import { w, h, height, width } from '../../utils/Dimensions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default GoogleMap = ({ navigation }) => {

  const ref = useRef();

  const [region, setRegion] = useState({
    latitude: 22.75,
    longitude: 75.8656,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [textAddressForHome, setTextAddressForHome] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [serachLat, setSearchLat] = useState('');
  const [serachLng, setSearchLng] = useState('');
  const isVisible = 'Yes' 
  useEffect(() => {
    console.log('navigation GoogleMap', navigation)
    Geocoder.init("AIzaSyC6NMl5VVe0jDn5EYrKqrHa6GZxFFk2AoQ");
  }, [])

  const moveToLocation = (lat, lng, isVisible) => {
    console.log("move to location")
    console.log("moveToLocation lat", lat)
    console.log("moveToLocation lng", lng)
    console.log("open", isVisible)
    
    const searchRegionData = {
      latitude: lat,
      longitude:lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    console.log("searchRegionData",searchRegionData);
    setRegion(searchRegionData);
      setTextAddressForHome(searchInput)
    if(isVisible){
      openModal();
    }
  }

  const getCurrentLocation = async () => {
    console.log("getCurrentLocation")
    Geolocation.getCurrentPosition(
      position => {
        console.log("position", position);
        const regionData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
          setRegion(regionData);
       
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            console.log("json", json);
              var addressComponent = json.results[0].formatted_address;
            
            console.log("addressComponent", addressComponent);
            setTextAddressForHome(addressComponent)
            
            if (navigation.state.params === "Home") {
              {
                (searchInput) ?
                  setTextAddressForHome(searchInput) :
                  setTextAddressForHome(addressComponent)
              }
            } 
               if(searchInput != '' || searchInput != null){
                  setTextAddressForHome(searchInput)   
               }
            openModal();
          })
          .catch(error => console.warn(error));
      },
      error => Alert.alert("Error", "Please enable device location."),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };
 
  const openModal = () => {
    setModalVisible(true);
  }

  const goBackWithLocation = () => {
    console.log('goBackWithLocation$$',navigation)
    if (navigation.state.params.screenName === "Home") {
     
      {
        (searchInput) ?
          navigation.navigate('CreateEvent', { selectedAddressHome: searchInput }) :
          navigation.navigate('CreateEvent', { selectedAddressHome: textAddressForHome })
      }
    }
    setModalVisible(false)
  }

  const closeModal = () => {
    setModalVisible(false);
  }
  const clearAutoplaceField = () => {
    ref.current?.clear();
    setSearchInput('');
    setRegion(region);
    setTextAddressForHome('');
  }  
  const renderPlacesInputRightButton = () => {
    return Platform.OS === 'android' ? (
      <TouchableOpacity 
      style={{alignItems:"center", justifyContent:"center", marginRight:10}} 
      onPress={() => clearAutoplaceField()}>
        <Image 
        source={require('../../assets/assest/assest/assest/cross.png')}
          style={{width:15, height:15, tintColor:"#000"}} 
          tintColor={'#000'}/>
      </TouchableOpacity>
    ) : null
  }

  const renderPlacesInputLeftButton = () => {
    return  (
      <TouchableOpacity 
      style={{alignItems:"center", justifyContent:"center", marginLeft:10}}  
      onPress={() => Actions.CreateEvent}>
        <Image 
        source={require('../../assets/assest/assest/assest/leftarrow.png')}
          style={{ height: h(3), width: w(5) }} />
      </TouchableOpacity>
    ) 
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          mapType='standard'
          region={region}
          showsUserLocation={true}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'My location'}
          />
        </MapView>
        <Callout
          style={{
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            top: 50,
            alignSelf: "center",
            backgroundColor: "#FFF",
            minHeight: 46,
            maxHeight: height,
            width: width - 20,
          }}
        >
          <View style={{ flexDirection: 'row',alignItems:'center' }}>
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder='Search'
              fetchDetails={true}
              autoFocus={false}
              renderRightButton={renderPlacesInputRightButton}
              renderLeftButton={renderPlacesInputLeftButton}
              onPress={(data, details) => {
                console.log("data", data.description)
                setSearchInput(data.description)
                const lat = details.geometry.location.lat;
                console.log('lat', lat)
                setSearchLat(lat)
                console.log("lng", lng)
                const lng = details.geometry.location.lng;
                setSearchLng(lng);
                // console.log("Lat", lat);
                // console.log('Lng', lng);
                moveToLocation(lat, lng);
              }}
              query={{
                key: 'AIzaSyC6NMl5VVe0jDn5EYrKqrHa6GZxFFk2AoQ',
                language: 'en',
              }}
              listViewDisplayed="auto"
              styles={{
                textInputContainer: {
                  width: '100%',
                  flexDirection: 'row',
                },
                textInput: {}
              }}
            >
            </GooglePlacesAutocomplete>
          </View>
        </Callout>

        <Callout
          style={{
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            bottom: 10,
            right: 10,
            alignSelf: "flex-end",
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <TouchableOpacity onPress={() => 
            searchInput ? moveToLocation(serachLat, serachLng, isVisible) : 
            getCurrentLocation() } style={styles.confirmLocationButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => closeModal()}>
                <Image 
                 source={require('../../assets/assest/assest/assest/cross.png')}
                  style={{ height: h(2), width: w(4), alignSelf: 'flex-end', marginTop: h(2), marginRight: w(5) }}>
                </Image>
              </TouchableOpacity>
            
                
                <Text style={styles.locationText}>{textAddressForHome}</Text>
              
              <TouchableOpacity style={styles.confirmModalButton} 
              onPress={() => goBackWithLocation()}>
                <Text style={[styles.confirmText, { color: '#fff' }]}>Confirm Location</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Callout>
      </View>
    </SafeAreaView>
  );
}
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backView: {
    height: h(7.5),
    width: w(13),
    backgroundColor: '#00000014',
    borderRadius: 12,
    marginTop: h(3),
    marginLeft: w(3),
    justifyContent: 'center',
    opacity: .5
  },
  confirmLocationButton: {
    height: h(6),
    width: w(30),
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmText: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  modalView: {
    backgroundColor: '#fff',
    width: '100%',
    height: h(40),
    marginTop: h(60),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  confirmModalButton: {
    height: Platform.OS === 'ios' ? h(7) : h(8),
    width: w(50),
    backgroundColor: '#6863ff',
    marginTop: h(15),
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationText: {
    textAlign: 'center',
    paddingLeft: w(4),
    paddingRight: w(4),
    marginTop: h(5)
  }
});

