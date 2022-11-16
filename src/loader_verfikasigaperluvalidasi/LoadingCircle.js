import { Image } from "react-native";
import LoadingCircleIcon from "../assets/LoadingCircle.png";
import React from "react";
import LoadingContext from "../contexts/LoadingContext";

/*
* LoadingCircle Component
*
* This shows up an animated loading circle*/
export function LoadingCircle() {
  const [rotation, setRotation] = React.useState(90)
  const loadingContext = React.useContext(LoadingContext)

  React.useEffect(() => {
    const interval = setInterval(() => {
      if(!loadingContext?.data?.show)
        return;

      setRotation(rotation => rotation + 10 > 360 ? 0 : rotation + 10)
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return <Image source={LoadingCircleIcon} style={{
    height: 100,
    width: 100,
    resizeMode: "contain",
    tintColor: "white",
    transform: [{ rotate: `${rotation}deg` }],
  }} />;
}
