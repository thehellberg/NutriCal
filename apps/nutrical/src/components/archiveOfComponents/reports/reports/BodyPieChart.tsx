import {Dimensions, Text, View} from "react-native";
import {PieChart} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function BodyPieChart({bodyDistributionData}) {
  return (
      <View>
        <View className={"bg-white mx-4 p-2 rounded-lg shadow pt-4"}>
          <PieChart
              data={bodyDistributionData}
              width={screenWidth - 48}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              accessor={"percent"}
              backgroundColor={"transparent"}
              center={[10, 0]}
              absolute
              avoidFalseZero
          />
        </View>
      </View>
  )
}