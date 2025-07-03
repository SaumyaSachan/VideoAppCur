import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import { View ,StatusBar} from 'react-native';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import LogOut from '../components/LogOut';

const Tab = createMaterialTopTabNavigator();

const BottomTab = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Show system status bar */}
      <StatusBar 
        barStyle="dark-content" // or "light-content" based on background
        backgroundColor="#f0f0f0" // match tabBarStyle background if needed
      />

    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 14 }, 
      tabBarIndicatorStyle: { backgroundColor: 'black' } ,
                tabBarStyle: {
            backgroundColor: '#f0f0f0',
            paddingTop: 70,
            paddingBottom: 10,
          },

    }}>
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>

    </View>
  );
};

export default BottomTab; 