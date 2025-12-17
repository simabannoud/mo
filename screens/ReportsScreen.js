import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ReportsScreen() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      const data = await AsyncStorage.getItem('sessions');
      const sessions = data ? JSON.parse(data) : [];

      // --- Son 7 Gün ---
      const days = [];
      const minutes = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString('tr-TR', { weekday: 'short' });

        const total = sessions
          .filter(
            (s) =>
              new Date(s.date).toDateString() === d.toDateString()
          )
          .reduce((sum, s) => sum + s.duration, 0);

        days.push(label);
        minutes.push(total);
      }

      setWeeklyData({
        labels: days,
        datasets: [{ data: minutes }],
      });

      // --- Kategori Dağılımı ---
      const categories = {};
      sessions.forEach((s) => {
        categories[s.category] =
          (categories[s.category] || 0) + s.duration;
      });

      const pie = Object.keys(categories).map((key, index) => ({
        name: key,
        population: categories[key],
        color: ['#4a90e2', '#50e3c2', '#f5a623', '#d0021b'][index % 4],
        legendFontColor: '#333',
        legendFontSize: 14,
      }));

      setCategoryData(pie);
    } catch (e) {
      console.log('Grafik verileri yüklenemedi', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Haftalık Odaklanma</Text>

      {weeklyData.labels && (
        <BarChart
          data={weeklyData}
          width={screenWidth - 20}
          height={220}
          fromZero
          chartConfig={chartConfig}
          style={styles.chart}
        />
      )}

      <Text style={styles.title}>🥧 Kategori Dağılımı</Text>

      {categoryData.length > 0 && (
        <PieChart
          data={categoryData}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: () => '#4a90e2',
  labelColor: () => '#555',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 12,
  },
});
