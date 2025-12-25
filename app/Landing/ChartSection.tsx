import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function ChartSection() {
  // Example data
  const totalUsers = 12456;
  const totalEpisodes = 98765;

  // Chart data (example, can be replaced with real data)
  const chartData = {
    labels: ["18 Oct", "25 Oct", "2 Nov", "9 Nov"],
    datasets: [
      {
        data: [4000, 5000, 3000, 4500], // positive values (e.g., users)
        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
      },
      {
        data: [-2000, -3000, -1500, -3500], // negative values (e.g., episodes)
        color: (opacity = 1) => `rgba(32, 222, 154, ${opacity})`,
      },
    ],
    legend: ["Users", "Episodes Watched"],
  };

  const screenWidth = Dimensions.get("window").width - 67;

  return (
    <View style={{ backgroundColor: '#141414', borderRadius: 16, padding: 20, marginVertical: 16, elevation: 12, shadowColor: '#b91c1c', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b91c1c', marginBottom: 12 }}>App Stats</Text>
      {/* Placeholder for chart */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#b91c1c' }}>{totalUsers}</Text>
          <Text style={{ color: '#fff', fontSize: 15 }}>Total Users</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#b91c1c' }}>{totalEpisodes}</Text>
          <Text style={{ color: '#fff', fontSize: 15 }}>Episodes Watched</Text>
        </View>
      </View>
      {/* Bar Chart */}
      <BarChart
        data={chartData}
        width={screenWidth}
        height={180}
        yAxisLabel={""}
        yAxisSuffix={""}
        fromZero
        withInnerLines={false}
        showBarTops={false}
        withHorizontalLabels={true}
        chartConfig={{
          backgroundGradientFrom: "#141414",
          backgroundGradientTo: "#141414",
          fillShadowGradient: '#b91c1c',
          fillShadowGradientOpacity: 1,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(185, 28, 28, ${opacity})`,
          labelColor: (opacity = 1) => `#fff`,
          propsForBackgroundLines: {
            stroke: "#444",
          },
          propsForLabels: {
            fontSize: 12,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 12,
        }}
        verticalLabelRotation={0}
        segments={4}
      />
    </View>
  );
}
