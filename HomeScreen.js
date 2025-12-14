import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const INITIAL_TIME = 25 * 60; // 25 dakika

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('ders');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [distractionCount, setDistractionCount] = useState(0);

  const appState = useRef(AppState.currentState);

  // Timer logic
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => interval && clearInterval(interval);
  }, [isRunning, timeLeft]);

  // AppState listener
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/) &&
        isRunning
      ) {
        // Dikkat dağıldı
        setDistractionCount((prev) => prev + 1);
        setIsRunning(false);
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [isRunning]);

  // Helpers
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(INITIAL_TIME);
    setDistractionCount(0);
  };

  return (
    <View style={styles.container}>

      {/* Category */}
      <View style={styles.categoryBox}>
        <Text style={styles.label}>Kategori Seç:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <Picker.Item label="Ders Çalışma" value="ders" />
          <Picker.Item label="Kodlama" value="kodlama" />
          <Picker.Item label="Proje" value="proje" />
          <Picker.Item label="Kitap Okuma" value="kitap" />
        </Picker>
      </View>

      {/* Timer */}
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

      {/* Distraction Info */}
      <Text style={styles.distraction}>
        Dikkat Dağınıklığı: {distractionCount}
      </Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={startTimer}>
          <Text style={styles.buttonText}>Başlat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pauseTimer}>
          <Text style={styles.buttonText}>Duraklat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Sıfırla</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  categoryBox: {
    width: '80%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  distraction: {
    fontSize: 16,
    marginBottom: 15,
    color: '#d9534f',
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
