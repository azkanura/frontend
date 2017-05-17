import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "backgroundColor": "ivory",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "match-container": {
        "position": "relative"
    },
    "canvas": {
        "position": "absolute",
        "border": "1px solid red",
        "width": "100%",
        "height": "100%",
        "left": 0,
        "right": 0,
        "zIndex": 1000
    },
    "draggable": {
        "height": 60,
        "background": "skyblue",
        "border": "1px solid green"
    },
    "right": {
        "background": "salmon"
    },
    "no-padding": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "wrap2": {}
});