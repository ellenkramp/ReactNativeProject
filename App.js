import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends React.Component {
  state = {
    places: [],
    selectedPlace: null
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(), 
          name: placeName,
          image: {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXL3_9g8kjcA8EYV3ZXX6ZD4SLGeMhp2HdtDR5qqi75cz5xVuhjg'
          }
        })
      };
    });
  };

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  }
  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    })
  }

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <PlaceDetail selectedPlace={this.state.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler} />
          <PlaceInput onPlaceAdded={this.placeAddedHandler} />
          <PlaceList 
            places={this.state.places} 
            onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
