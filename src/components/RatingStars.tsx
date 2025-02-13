import React from 'react'
import { View } from 'react-native';
import { HoverEffect } from 'react-ts-rating-star/dist/esm/components/types/types';
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons"


type RatingStarProps = {
    numberofStars?: number;
    averageRating: number;
    // iconColor: string;
    // backgroundColor: string;
    // iconWidth: string;
    // iconHeight: string;
    // iconHoverEffect: HoverEffect;
    onPressFunction:(rating: number) => void;
}


export default function Stars({
    numberofStars = 5,
    averageRating,
    // iconColor = 'gold',
    // backgroundColor = 'darkgray',
    // iconWidth = "16px",
    // iconHeight = "16px",
    // iconHoverEffect = "none",
    onPressFunction


}: RatingStarProps) {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name={i <= averageRating ? "star" : "star-o"}
        size={20}
        color={i <= averageRating ? "gold" : "gray"}
        style={{ marginRight: 2 }}
      />
    );
  }

    return (
        <View>
            {stars}
        </View>
    )
}

