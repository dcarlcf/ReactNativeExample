import React, { Component } from 'react';
import { AppRegistry, ScrollView, 
  StyleSheet, Image, Text, View,Button,Alert, TouchableWithoutFeedback } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

export class paintingViewScreen extends Component {
	render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

export class paintingListScreen extends Component {

	static navigationOptions = {
    title: 'Painting List',
  };

  state = {
      paintings: [

         {'title': 'Lost in space and time', 
         'artist': 'Eitan', 
         'price': '$.4 ETH',
     	  'image': 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 
         'id': 1},

         {'title': 'Cool Mona', 
         'artist': 'Cool Leo', 
         'price': '$.3 ETH',
         'image': 'https://i.pinimg.com/originals/0a/a3/09/0aa3092b44da8ad03a7f2d3e9ae6d413.jpg', 
         'id': 2},

         {'title': 'Las Meninas', 
         'artist': 'Velazquez', 
         'price': '$.6 ETH',
         'image': 'https://media1.britannica.com/eb-media/03/192503-050-15BBC5DC.jpg', 
         'id': 3},
      ]
   }

  render() {

 	const { navigate } = this.props.navigation;

      return (
        <View style={{flex: 1}}>

        <LinearGradient colors={['#00BFFF', '#1E90FF']} style={styles.linearGradient}>
          <Text style={styles.headerText}>
          Your Collection
          </Text>
          <Text style={styles.subtitleText}>
          3 Pieces
          </Text>
          </LinearGradient>

         
        <ScrollView style={styles.scrollViewStyle}>

          {
                  this.state.paintings.map((item, index) => (

                  <TouchableWithoutFeedback 
                  onPress={() => navigate('paintingView' ) }
                  key = {item.id}>

                     <View style = {styles.paintingListEntry}>              

                     	<Image source={{uri: item.image}}
      					 style={styles.paintingThumbnailStyle} />

      					 <View style = {styles.paintingListEntryDescriptionParent}>
                        	<Text style = {styles.paintingListHeaderEntryText}>{item.title}</Text>
                       		<Text style = {styles.paintingListSubEntryText}>{item.artist}</Text>
                       		<Text style = {styles.paintingListSubEntryText}>{item.price}</Text>
                       	 </View>

                     </View>
                   </TouchableWithoutFeedback>
                  ))
               }

        </ScrollView>

        </View>
    );
  }
}

const styles = StyleSheet.create({
	linearGradient: {
    flex: .25,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollViewStyle: {
    flex: 20,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  paintingListEntry: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      margin: 10,
      borderColor: '#2a4944',
      borderWidth: 0,
      backgroundColor: '#F8F8FF',
      borderRadius: 10,
   },
   paintingThumbnailStyle: {
   	width:100, 
   	height: 120,
   	alignSelf: 'flex-start',
   	borderRadius: 5,
   	margin: 5,
   },
   paintingListEntryDescriptionParent: {
   	flex: 1,
   	overflow: 'visible',
   },
   paintingListHeaderEntryText: {
   	fontSize: 30,
   },
   paintingListSubEntryText: {
   	fontSize: 20,
   },
   paintingListViewButtonParent: {
   	backgroundColor: 'blue',
   	flexDirection: 'row',
   },
   paintingListExpand: {
   	fontSize: 40,
   },
  headerText: {
    fontSize: 40,
    fontFamily: 'Gill Sans',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 30,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  subtitleText: {
  	fontSize: 20,
  	color: '#ffffff'
  }
});

const RootStack = StackNavigator({
  paintingList: { screen: paintingListScreen },
  paintingView: { screen: paintingViewScreen }, },
  {
    initialRouteName: 'paintingList',
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// skip these lines if using Create React Native App
AppRegistry.registerComponent(
  'AwesomeProject',
  () => IScrolledDownAndWhatHappenedNextShockedMe);
