import React from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from 'screens/HomeScreen';
import CoordinatesScreen from 'screens/CoordinatesScreen'
import styled from 'styled-components/native';

const Tabs = AnimatedTabBarNavigator();

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const TabBarIcon = (props: any) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};


export default () => (
  <Tabs.Navigator
    initialRouteName="CoordinatesScreen"
    tabBarOptions={{
      activeTintColor: '#ffffff',
      inactiveTintColor: '#223322',
      activeBackgroundColor: 'red',
    }}
    appearance={{
      shadow: true,
      floating: true,
      whenActiveShow: TabElementDisplayOptions.ICON_ONLY,
      dotSize: DotSize.SMALL,
    }}>
    <Tabs.Screen
      name="User"
      component={CoordinatesScreen}
      options={{
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon focused={focused} tintColor={color} name="User" />
        ),
      }}/>
  </Tabs.Navigator>
);