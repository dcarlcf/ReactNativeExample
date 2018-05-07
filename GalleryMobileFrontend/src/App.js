import React, { Component } from 'react';
import { AppRegistry, ScrollView, 
  StyleSheet, 
  Image, 
  Text, 
  View,
  Button,
  Alert, 
  TouchableWithoutFeedback,
  ActivityIndicator,
  AsyncStorage,
  StatusBar, 
} from 'react-native';


const timer = require('react-native-timer');


import {
  TabNavigator,
  StackNavigator,
  SwitchNavigator,
} from 'react-navigation';

import LinearGradient from 'react-native-linear-gradient';
import "./screens/screens.js"
import "./styles/styles.js"

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class Settings extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

export class paintingViewScreen extends Component {
	render() {

    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const itemTitle = params ? params.itemTitle : null;
    const itemPrice = params ? params.itemPrice: null;
    const itemArtist = params ? params.itemArtist: null;
    const itemURL = params ? params.itemURL: null;

    return (
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style = {paintingDetailStyles.paintingTitle} >{itemTitle}</Text>
        <Text style = {paintingDetailStyles.paintingArtist}>{itemArtist}</Text>
        <Text style = {paintingDetailStyles.paintingPrice}>{itemPrice}</Text>
        <Image source={{uri: itemURL}}
                 style={paintingDetailStyles.paintingStyle} />
      </View>
      </ScrollView>
    );
  }
}

export class paintingListScreen extends Component {

	static navigationOptions = {
	title: 'Your Collection',
    header: null,
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

         {'title': 'Third of May', 
         'artist': 'Goya', 
         'price': '$.6 ETH',
         'image': 'https://en.wikipedia.org/wiki/The_Third_of_May_1808#/media/File:El_dos_de_mayo_de_1808_en_Madrid.jpg', 
         'id': 4},
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
                  onPress={() => navigate('paintingView', {
                    itemID: item.id,
                    itemTitle: item.title,
                    itemArtist: item.artist,
                    itemPrice: item.price,
                    itemURL: item.image,

                   }) 
                  }
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

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: 'null'
  };

  componentDidMount(){
         // Start counting when the page is loaded
         this.timeoutHandle = setTimeout(()=>{
              this.props.navigation.navigate('App');
         }, 1000);
    }

    componentWillUnmount(){
         clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    render() {

    return (
      <View style={styles.logInBackground}>
        <Image source={require('./images/LogoWhite.png')} style ={styles.logoLogInStyle} />
         <Text style = {styles.logInButton}> Smart Canvas App</Text>
        //How to redirect to another page from here after 5 secs?
        </View>

    );
  }

}


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Auth' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const paintingDetailStyles = StyleSheet.create({
  paintingTitle: {
    fontSize: 30,
    paddingVertical: 5,
  },
  paintingArtist: {
    fontSize: 20,
  },
  paintingPrice: {
    fontSize: 20,
  },
  paintingStyle: {
    width: 500,
    height: 500,
  },

});

const styles = StyleSheet.create({
  logInButton: {
    fontFamily: 'OpenSans-SemiBold',
    paddingVertical: 10,
    fontSize: 15,
    color: '#FFFFFF'
  },
  logoLogInStyle: {
    flex: .15,
    resizeMode: 'contain',

  },
  logInBackground: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

const paintingListStack = StackNavigator({
  paintingList: { screen: paintingListScreen },
  paintingView: { screen: paintingViewScreen }, },
  {
    initialRouteName: 'paintingList',

    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00BFFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppStack =  TabNavigator({
  Explore: { screen: HomeScreen },
  Collection: {screen: paintingListStack},
  Settings: { screen: Settings},
});

const AuthStack = StackNavigator({ SignIn: SignInScreen });

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    initialRouteParams: { transition: 'fade' },
  }
);

// skip these lines if using Create React Native App
AppRegistry.registerComponent(
  'AwesomeProject',
  () => IScrolledDownAndWhatHappenedNextShockedMe);
