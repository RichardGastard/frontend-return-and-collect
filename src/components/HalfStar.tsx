import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const HalfStar = () => {
  return (
    <View style={{ width: 16, height: 16, marginRight: 2 }}>
      <FontAwesome name="star-o" size={16} color="gray" />
      <View style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>
        <FontAwesome name="star" size={16} color="gold" />
      </View>
    </View>
  );
};

export default HalfStar;