// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all our created screens
import ItemsListScreen from '../screens/ItemListScreen';
import CreateItemAboutScreen from '../screens/CreateItemAboutScreen';
import CreateItemDetailsScreen from '../screens/CreateItemDetailsScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ItemsList">
        <Stack.Screen
          name="ItemsList"
          component={ItemsListScreen}
          options={{ title: 'Digital Products' }}
        />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen
          name="CreateItemAbout"
          component={CreateItemAboutScreen}
          options={{ title: 'About' }}
        />
        <Stack.Screen
          name="CreateItemDetails"
          component={CreateItemDetailsScreen}
          options={{ title: 'Additional Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
