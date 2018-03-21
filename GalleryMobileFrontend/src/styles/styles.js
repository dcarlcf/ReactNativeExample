import React, { Component } from 'react';
import { AppRegistry, ScrollView, 
  StyleSheet, Image, Text, View,Button,Alert, TouchableWithoutFeedback } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

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