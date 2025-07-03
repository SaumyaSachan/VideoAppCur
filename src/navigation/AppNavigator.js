import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import BottomTab  from '../screens/BottomTab'
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';
import LogOut from '../components/LogOut';
import Genre from '../screens/Genre';
import Camera from '../screens/Camera';
import HomePage from '../screens/HomePage';
import PlayVideo from '../components/PlayVideo';
import HomeDrawer from '../screens/HomeDrawer';
import Notification from '../screens/Notification';
import Search from '../screens/Search';
import VideoDetailScreen from '../screens/VideoDetailScreen';
import DownloadedVideo from '../screens/DownloadedVideo';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromAsyncStorage, loadProfileImageFromAsyncStorage, setCurrentUser } from '../redux/slice/userSlice';
import FirstScreen from '../screens/FirstScreen';


const  Stack=createNativeStackNavigator();

const AppNavigation = () => {
      const [initializing, setInitializing] = useState(true);
      const dispatch = useDispatch();
      const user = useSelector(state => state.user.currentUser);
    
      // Listen to Firebase Auth state changes and update Redux
      useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            // You can add more fields if needed
            const userData = {
              email: firebaseUser.email,
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            };
            dispatch(setCurrentUser(userData));
          } else {
            dispatch(setCurrentUser(null));
          }
        });
        return unsubscribe;
      }, [dispatch]);
    
      // Monitor async storage for legacy user data (optional)
      useEffect(() => {
        dispatch(loadUserFromAsyncStorage()).finally(() => setInitializing(false));
        dispatch(loadProfileImageFromAsyncStorage());
      }, [dispatch]);
    
      if (initializing) return null;
    
  return (

    

        user ? (
                   <Stack.Navigator initialRouteName="SplashScreen">
    <Stack.Screen name='SplashScreen'component={SplashScreen} options={{headerShown:false}}/>
    <Stack.Screen name='FirstScreen'component={FirstScreen}  options={{headerShown:false}}/>
    <Stack.Screen name='HomePage'component={HomePage}  options={{headerShown:false}}/>
    <Stack.Screen name='Genre'component={Genre}  options={{headerShown:false}}/>
    <Stack.Screen name='Camera'component={Camera} />
    <Stack.Screen name='PlayVideo' component={PlayVideo} />
    <Stack.Screen name='Notification' component={Notification} options={{headerShown:false}} />
    <Stack.Screen name='Search' component={Search} options={{headerShown:false}} />
    <Stack.Screen name='VideoDetailScreen' component={VideoDetailScreen} options={{headerShown:false}} />
    <Stack.Screen name='DownloadedVideo' component={DownloadedVideo}  options={{headerShown:false}}/>
    <Stack.Screen name='HomeDrawer' component={HomeDrawer}  options={{headerShown:false}}/>
    <Stack.Screen name='EditProfile' component={require('../screens/EditProfile').default} />
    <Stack.Screen name='LogOut'component={LogOut} />
   </Stack.Navigator>
        )
        :
        
        (

       <Stack.Navigator >

    <Stack.Screen name='SplashScreen'component={SplashScreen} options={{headerShown:false}}/>
    <Stack.Screen name='FirstScreen'component={FirstScreen} options={{headerShown:false}}/>
    <Stack.Screen name='BottomTab'component={BottomTab} options={{headerShown:false}} />
    <Stack.Screen name='Genre'component={Genre}  options={{headerShown:false}}/>
    <Stack.Screen name='HomePage'component={HomePage} options={{headerShown:false}} />
    <Stack.Screen name='Camera'component={Camera} />
    <Stack.Screen name='PlayVideo'component={PlayVideo} />
    <Stack.Screen name='Search' component={Search} options={{headerShown:false}}/>
    <Stack.Screen name='Notification' component={Notification} options={{headerShown:false}} />
    <Stack.Screen name='VideoDetailScreen' component={VideoDetailScreen}  options={{headerShown:false}} />
    <Stack.Screen name='DownloadedVideo' component={DownloadedVideo}  options={{headerShown:false}}/>
    <Stack.Screen name='HomeDrawer' component={HomeDrawer} options={{headerShown:false}}/>
    <Stack.Screen name='EditProfile' component={require('../screens/EditProfile').default} />
    <Stack.Screen name='LogOut'component={LogOut} />

   </Stack.Navigator>

        )



  )
}

export default AppNavigation 