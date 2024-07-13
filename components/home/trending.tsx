import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;
const PAGE_WIDTH = window.innerWidth;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

function TrendingVideos() {
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const progress = useSharedValue<number>(0);
  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH * 0.86,
        height: PAGE_WIDTH * 0.6,
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH * 0.6,
      } as const);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    console.log({ index });
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.7,
          parallaxScrollingOffset: 500,
        }}
        autoPlayInterval={1500}
        {...baseOptions}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          console.log({ offsetProgress });
          // Update the progress shared value here
          progress.value = absoluteProgress;
        }}
        ref={ref}
        // style={{
        //   width: PAGE_WIDTH,
        // }}
        width={width}
        height={width / 2}
        data={data}
        renderItem={({ index }) => (
          <View style={styles.carouselItem}>
            <Text style={styles.carouselText}>{index}</Text>
          </View>
        )}
        // ref={ref}
        //
        // style={{
        //   width: PAGE_WIDTH,
        // }}
        // // onProgressChange={onPressPagination}
      />

      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              Math.round(progress.value) === index
                ? styles.activeDot
                : styles.inactiveDot,
            ]}
            onPress={() => onPressPagination(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  carouselText: {
    textAlign: "center",
    fontSize: 30,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  inactiveDot: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default TrendingVideos;
