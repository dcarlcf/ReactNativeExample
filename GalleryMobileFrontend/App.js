import React, { Component } from 'react';
import { AppRegistry, ScrollView, 
  StyleSheet, Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {

  state = {
      names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5},
         {'name': 'Laura', 'id': 6},
         {'name': 'John', 'id': 7},
         {'name': 'Debra', 'id': 8},
         {'name': 'Aron', 'id': 9},
         {'name': 'Ann', 'id': 10},
         {'name': 'Steve', 'id': 11},
         {'name': 'Olivia', 'id': 12}
      ]
   }

  render() {
      return (
        <View style={{flex: 1}}>

        <LinearGradient colors={['#5f9ea0', '#6495ed', '#00008b']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
          5 Paintings
          </Text>
          </LinearGradient>

         
        <ScrollView style={styles.scrollViewStyle}>

          {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {styles.item}>
                        <Text>{item.name}</Text>
                        //<Text>test</Text>
                        //<Text>test</Text>
                     </View>
                  ))
               }

        </ScrollView>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: .25, 
    backgroundColor: 'darkblue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20, 
    fontFamily: 'GeosansLight',
    fontSize: 45,
    color: 'white',
  },
  viewOfPaintings: {
    flex: 1,
    paddingVertical: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  scrollViewStyle: {
    flex: 20,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  singlePaintingRow: {
    flex: 1,
    backgroundColor: 'green',
    //flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 100,
    paddingRight: 100,
    //margin: 50,
    //paddingLeft: 30,
    //paddingRight: 30,
    borderRadius: 5,
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 80,
      margin: 50,
      borderColor: '#2a4944',
      borderWidth: 5,
      backgroundColor: '#F0FFFF',
      borderRadius: 5,
   },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  linearGradient: {
    flex: .25,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 30,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

// skip these lines if using Create React Native App
AppRegistry.registerComponent(
  'AwesomeProject',
  () => IScrolledDownAndWhatHappenedNextShockedMe);
