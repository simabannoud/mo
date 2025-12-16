import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReportsScreen() {
  const [todayTotal, setTodayTotal] = useState(0);
  const [allTimeTotal, setAllTimeTotal] = useState(0);
  const [totalDistractions, setTotalDistractions] = useState(0);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await AsyncStorage.getItem('sessions');
      const sessions = data ? JSON.parse(data) : [];

      const today = new Date().toDateString();

      let todayMinutes = 0;
      let allMinutes = 0;
      let distractions = 0;

      sessions.forEach((session) => {
        const sessionDate = new Date(session.date).toDateString();

        allMinutes += session.duration;
        distractions += session.distractions;

        if (sessionDate === today) {
          todayMinutes += session.duration;
        }
      });

      setTodayTotal(todayMinutes);
      setAllTimeTotal(allMinutes);
      setTotalDistractions(distractions);
    } catch (error) {
      console.log('Raporlar yüklenemedi', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Odaklanma Raporları</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Bugün Toplam Odaklanma</Text>
        <Text style={styles.value}>{todayTotal} dk</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tüm Zamanların Toplamı</Text>
        <Text style={styles.value}>{allTimeTotal} dk</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Toplam Dikkat Dağınıklığı</Text>
        <Text style={styles.value}>{totalDistractions}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
