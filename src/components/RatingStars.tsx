import React from "react";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { HoverEffect } from "react-ts-rating-star/dist/esm/components/types/types";
import { FontAwesome, FontAwesome5 } from "react-native-vector-icons";

type RatingStarProps = {
  numberofStars?: number;
  onPress: (rating: number) => void;
};

export default function RatingStars({
  numberofStars = 5,
  onPress = () => {}
}: RatingStarProps) {
    const [rating, setRating] = useState<number>(0)

    const handlePress = (starIndex: number) => {
        setRating(starIndex + 1)
        onPress(starIndex + 1)
    }




    return (
        <View style={{ flexDirection: "row" }}>
          {Array.from({ length: numberofStars }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(index)}>
              <FontAwesome
                name={index < rating ? "star" : "star-o"} 
                size={25}
                color={index < rating ? "gold" : "gray"} // Couleur de l'étoile
                style={{ marginHorizontal: 5 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    }
