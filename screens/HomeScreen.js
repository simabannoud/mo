import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Ders Çalışma');

  return (
    <View style={styles.container}>
      
      {/* Kategori Seçimi */}
      <View style={styles.categoryBox}>
        <Text style={styles.label}>Kategori Seç:</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Ders Çalışma" value="ders" />
          <Picker.Item label="Kodlama" value="kod" />
          <Picker.Item label="Proje" value="proje" />
          <Picker.Item label="Kitap Okuma" value="kitap" />
        </Picker>
      </View>

      {/* Zamanlayıcı Gösterimi */}
      <Text style={styles.timer}>25:00</Text>

      {/* Butonlar */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Başlat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Duraklat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sıfırla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  categoryBox: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  timer: {
    fontSize: 60,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

