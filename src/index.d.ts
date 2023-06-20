declare module "react-native-emoji-container" {
    import * as React from "react";
    export enum Categories {
      recently_used = "recently_used",
      smileys_emotion = 'smileys_emotion',
      people_body = 'people_body',
      animals_nature = 'animals_nature',
      food_drink = 'food_drink',
      travel_places = 'travel_places',
      activities = 'activities',
      objects = 'objects',
      symbols = 'symbols',
      flags = 'flags',
      search = 'search',
    }
  
    export interface EmojiContainerProps {
     
    }
  
    const EmojiContainer: React.ComponentType<EmojiContainerProps>;
  
    export default EmojiContainer;
  }