import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

/*
* Lister Common Component
*
* This component is used to display list of string items vertically. Also
* handles the user interaction when tapping at an item on the list
*
* Required Props:
* - listData: an array containing the data to be shown
* - currentSelectedItem: an object containing the currently selected data
* - onItemPress: callback when user taps on one of the item in the list.
*                the component will pass reference to the tapped item
*                to the callback
* - renderItem: callback that's used by the component to render each item
*               on the list.
*               the component will pass reference to the current item
*               and its index.
*               the component expects the callback to return a `React.component`
* - keyExtractor: callback that's used by the component to extract the key
*                 that will be used by the component for equality comparison
* */
const Lister = ({
                  listData,
                  currentSelectedItem,
                  onItemPress,
                  renderItem,
                  keyExtractor,
                }) => {
  return (
    <ScrollView>
      {
        listData && listData
          .map((el, idx) =>
            <TouchableOpacity
              key={idx}
              style={{
                height: 50,
                backgroundColor: !keyExtractor ? "black" : keyExtractor(el) === keyExtractor(currentSelectedItem) ?
                  "#c0ffa8" : idx % 2 === 0 ? "#f2f2f2" : "white",
                justifyContent: "center",
                paddingLeft: 15,
              }}
              onPress={() => onItemPress(el)}
            >
              {renderItem && renderItem(el, idx)}
            </TouchableOpacity>,
          )
      }
    </ScrollView>
  );
};

export default Lister;
