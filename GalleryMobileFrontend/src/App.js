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
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';

Dimensions = React.Dimensions || require('Dimensions'), {width, height} = Dimensions.get('window');

const  vw = width/100
const vh = height/100


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

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign out!" onPress={this._signOutAsync} />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');  
  };
}

export class paintingViewScreen extends Component {
	render() {

    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const itemTitle = params ? params.itemTitle : null;
    const itemPrice = params ? params.itemPrice: null;
    const itemArtist = params ? params.itemArtist: null;
    const itemURL = params ? params.itemURL: null;

    Image.getSize(itemURL, (width, height) => {this.setState({width, height})});

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

         {'title': 'Mr Tie Guy', 
         'artist': 'Eitan Barokas', 
         'price': '$.4 ETH',
     	   'image': "require('./images/Abstract.jpg')", 
         'width': 1657,
         'height': 2159,
         'id': 1},

         {'title': 'Magdiel', 
         'artist': 'Alexander Casanova LA', 
         'price': '$.3 ETH',
         'image': './images/Abstract.jpg', 
          'width': 2500,
         'height': 1874,
         'id': 2},

         {'title': 'Memory Lane', 
         'artist': 'Nathan Lane', 
         'price': '$.6 ETH',
         'image': 'require(./images/Abstract.jpg)', 
         'width': 2500,
         'height': 1874,
         'id': 3},

      ],
      numPaintings: 5,

   }



  render() {

 	const { navigate } = this.props.navigation;

      return (
        <View style={{flex: 1}}>

        <View style = {styles.viewScreenHeader}>

          <View style = {styles.yourCollectionText}>
            <Text style = {styles.headerText} numberOfLines = {2} >
            Your
            </Text>
            <Text style = {styles.headerText} numberOfLines = {2} >
            Collection
            </Text>
          </View>
          <Image source={require('./images/LogoWhite.png')} style ={styles.logoViewHeaderStyle} />
          <View style = {styles.yourCollectionText, {alignSelf: 'center'}}>
              <Text style={styles.subtitleText}>
              {this.state.numPaintings} Paintings
              </Text>
          </View>
        </View>

         
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
                    itemWidth: item.width,
                    itemHeight: item.height,

                   }) 
                  }
                  key = {item.id}>

                     <View style = {styles.paintingListEntry}>              

      					 <View style = {styles.paintingListEntryDescriptionParent}>
                        	<Text style = {styles.paintingListHeaderEntryText}>{item.title}</Text>
                       		<Text style = {styles.paintingListSubEntryText}>{item.artist}</Text>
                  </View>
                          <Image source = {require('./images/Magdiel.jpg')}
                 style={{alignSelf: 'center', height: vh*18.5, width: (item.width/item.height)*vh*18.5}} />
                 
                     </View>
                   </TouchableWithoutFeedback>
                  ))
               }

        </ScrollView>

        </View>
    );
  }
}

class LoadScreen extends React.Component {
  static navigationOptions = {
    header: 'null'
  };

  componentDidMount(){
         // Start counting when the page is loaded
         this.timeoutHandle = setTimeout(()=>{
              this.props.navigation.navigate('AuthLoading');
         }, 5000);
    }

    componentWillUnmount(){
         clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    render() {

    return (
     <View style={styles.logInBackground}>
        <FadeInView style = {
          {
            flex: 1,
            backgroundColor: '#000000',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }>
        <Image source={require('./images/LogoWhite.png')} style ={styles.logoLogInStyle} />
         <Text style = {styles.logInButton}> Smart Canvas App</Text>
         </FadeInView>
        </View>

    );
  }

}

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
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
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.state = {errorMessage: "invalid"}
  }

  state =  {
    errorMessage: true,
    emailText: '',
    passwordText: '',
  }
 
  static navigationOptions = {
    header: 'null',
  };

  render() {
    const { params } = this.props.navigation.state;
    const passwordColor = "#FF0000"//params ? params.errorMessage : null;
    const passwordShow = .6;
    return (
      <View style={styles.signInScreenBackground}>

      <Image source={require('./images/LogoWhite.png')} style ={styles.logoSignInStyle} />

      <View style = {styles.singInBelowLogo} >

      <Text style = {styles.signInText}> Sign In </Text>

      <Text style = {styles.signInInfoText}> Email </Text>
      <View style = {styles.textInputBoxStyle}>
      <TextInput  style={styles.textInputStyle} placeholder = "You@email.com" 
      onChangeText={(emailText) => {
        this.setState({errorMessage: false});
        this.setState({emailText});
      }
      }
      />
      </View>

      <Text style = {styles.signInInfoText}> Password </Text>
      <View style = {styles.textInputBoxStyle}>
      <TextInput secureTextEntry = {true} style={styles.textInputStyle} placeholder = 'Password' 
      onChangeText={(passwordText) => {
        this.setState({errorMessage: false});
        this.setState({passwordText});
      }
      }
      />
      <Image source = {require('./images/errorExclamation.png')} 
      style = { [styles.errorMessageStyle, this.state.errorMessage && styles.showErrorMessage] }/>
      </View>

      <TouchableOpacity onPress={this._signInAsync}>
      <View style = {styles.buttonStyle}>
      <Text style = {styles.buttonTextStyle}>Access Your Art</Text>
      </View>
      
       </TouchableOpacity>

      <TouchableOpacity onPress={this._recoverEmail} >
      <Text style = {styles.recoverInfoText}>Recover Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this._recoverPassword} >
      <Text style = {styles.recoverInfoText}>Recover Password</Text>
      </TouchableOpacity>

      </View>

      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  _recoverEmail = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
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
  logoViewHeaderStyle: {
    height: 6*vh,
    width: 17*vw,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  yourCollectionText: {
    height: 13.5*vh,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 2*vw,
  },
  subtitleText: {
    fontSize: vw*3,
    fontFamily: 'OpenSans-SemiBold',
    color: '#ffffff',
    alignSelf: 'center',
    marginRight: 2*vw,
  },
  headerText: {
    fontSize: vw*3.5,
    marginLeft: vw*2,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'left',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  viewScreenHeader: {
    backgroundColor: "#000000",
    height: 13.5*vh,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  errorMessageStyle: {
    flex: 1,
    opacity: 0,
    width: 150,
    height: vh*6,
    marginRight: vw*4,
    alignSelf: 'flex-end'
  },
  showErrorMessage: {
    opacity: 1,
  },
  singInBelowLogo: {
    marginTop: 40,
    flex: .8,
    alignSelf: 'stretch'
  },
  recoverInfoText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 10,
    marginBottom: 10,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  logoSignInStyle: {
    marginTop: vh*10,
    marginBottom: 0,
    flex: .15,
    resizeMode: 'contain',
  },
  signInText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 12,
    marginLeft: vw*12.5,
    alignSelf: 'flex-start',
  },
  signInInfoText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: vh*1.5,
    marginLeft: vw*12.5,
    alignSelf: 'flex-start',

  },
  textInputBoxStyle: {
    backgroundColor: '#FFFFFF',
    height: vh*6,
    width: vw*75,
    borderRadius: 6,
    marginBottom: 10,
    marginLeft: vw*4,
    marginRight: vw*4,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  signInScreenBackground: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    flex: 1,
    height: vh*6,
    marginLeft: vw*2,
    alignSelf: 'flex-start'
  },
  buttonTextStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: '#000000'
  },
  buttonStyle: {
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 50,
    borderRadius: 6,
    marginTop: vh*2,
    marginBottom: vh*2,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInButton: {
    fontFamily: 'OpenSans-SemiBold',
    paddingVertical: 10,
    fontSize: 15,
    color: '#FFFFFF'
  },
  logoLogInStyle: {
    paddingVertical: 10,
    flex: .2,
    resizeMode: 'contain',
  },
  logInFadeInView: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInBackground: {
    flex: 1,
    backgroundColor: '#000000',
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
    backgroundColor: 'white',
  },
  paintingListEntry: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: vw*3,
      marginRight: vw*3,
      borderColor: '#2a4944',
      borderWidth: 0,
      backgroundColor: '#FFFFFF',
      height: vh*24,
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 2,
   },
   paintingThumbnailStyle: {
   	height: vh*15,
    width: ( (656/480)*vh*8),
    marginBottom: vh*2.5,
    backgroundColor: '#000000',
    resizeMode: 'contain',
   },
   paintingListEntryDescriptionParent: {
    flex: 2,
   	flexDirection: 'column',
   },
   paintingListHeaderEntryText: {
    justifyContent: 'center',
   	fontSize: vw*5.5,
    fontFamily: 'OpenSans-Bold',
    marginLeft: vw*5,
    marginRight: vw*4,
   },
   paintingListSubEntryText: {
   	fontSize: vw*3,
    fontFamily: 'OpenSans-SemiBoldItalic',

    marginLeft: vw*5,
    marginRight: vw*4,
   },
   paintingListViewButtonParent: {
   	backgroundColor: 'blue',
   	flexDirection: 'row',
   },
   paintingListExpand: {
   	fontSize: 40,
   },
});

const paintingListStack = StackNavigator({
  paintingList: { screen: paintingListScreen },
  paintingView: { screen: paintingViewScreen }, },
  {
    initialRouteName: 'paintingList',

    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppStack =  TabNavigator({
  Collection: {screen: paintingListStack},
  Settings: { screen: Settings},
});

const AuthStack = StackNavigator({ 

  SignIn: SignInScreen,
  
});

export default SwitchNavigator(
  {
    Load: LoadScreen,
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
