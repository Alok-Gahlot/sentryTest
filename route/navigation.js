import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home';
import NextScreen from '../NextScreen';
import Onboarding from '../Onboarding';
const Stack = createNativeStackNavigator();

function App(props) {
  const navigation = React.useRef();
  return (
    <NavigationContainer
    //   ref={navigation}
    //   onReady={() => {
    //     props.routingInstrumentation.registerNavigationContainer(navigation);
    //   }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
