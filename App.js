import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

var arr = [
  { image: require("./assets/pictures/beach.png") },
  { image: require("./assets/pictures/flower.png") },
  { image: require("./assets/pictures/mountain.png") },
  { image: require("./assets/pictures/bridge.png") },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };

    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: this.isPortait()
          ? this.scrollImageToLeft()
          : this.scrollImageToRight(),
      });
    });
  }

  isPortait() {
    const dim = Dimensions.get("window");
    return dim.height >= dim.width;
  }

  scrollImageToLeft() {
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  scrollImageToRight() {
    if (this.state.counter < arr.length - 1) {
      this.setState({ counter: this.state.counter + 1 });
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      // SafeAreaView is only used for iOS, specially for iPhone 10+
      <SafeAreaView style={styles.container}>
        <GestureRecognizer
          onSwipeLeft={() => this.scrollImageToRight()}
          onSwipeRight={() => this.scrollImageToLeft()}
          config={config}
        >
          <TouchableWithoutFeedback
            onPress={() => this.scrollImageToRight()}
            onLongPress={() => this.scrollImageToLeft()}
          >
            <Image
              source={arr[this.state.counter].image}
              style={{
                width: 400,
                height: 400,
                resizeMode: "contain",
              }}
            />
          </TouchableWithoutFeedback>
        </GestureRecognizer>

        <Button title="Left" onPress={() => this.scrollImageToLeft()} />
        <Button title="Right" onPress={() => this.scrollImageToRight()} />
        <Image
          source={require("./assets/mic_image.png")}
          style={{
            width: 75,
            height: 75,
            marginVertical: 50,
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
