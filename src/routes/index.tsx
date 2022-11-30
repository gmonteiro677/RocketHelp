import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Signin } from "../screens/Signin";
import { AppRoutes } from './app.routes'
import { Loading } from "../components/Loading";

export function Routes() {
const [isLoading, setIsloading] = useState(true)
const [isUser, setIsUser] = useState<FirebaseAuthTypes.User>()
useEffect(() => {
  const subscriber = auth()
  .onAuthStateChanged(response => {
      setIsUser(response)
      setIsloading(false)
  })
return subscriber;

},[]);

if(isLoading) {
  return <Loading/>
}

  return(
    <NavigationContainer>
     {isUser ? <AppRoutes /> : <Signin />}
    </NavigationContainer>
  )
}