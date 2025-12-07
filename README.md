 Odaklanma Takibi ve Raporlama Uygulaması

React Native (Expo) – Mobil Uygulama Geliştirme Dönem Projesi

Bu proje, dijital dikkat dağınıklığıyla mücadele etmeyi amaçlayan bir odaklanma takip uygulamasıdır.
Kullanıcı, belirli bir süre için odaklanma seansı başlatabilir; uygulama bu süre boyunca kullanıcının uygulamadan çıkıp çıkmadığını takip eder ve seans sonunda anlamlı veriler sunar.

 Özellikler (MVP Gereksinimleri)
🔹 1. Ana Sayfa (Zamanlayıcı)

25 dakika (± ayarlanabilir) geri sayım sayacı
Başlat / Duraklat / Sıfırla butonları
Kategori seçimi (Ders, Kodlama, Kitap vb.)

Seans sonunda özet gösterimi:
Süre
Kategori
Dikkat dağınıklığı sayısı

🔹 2. Dikkat Dağınıklığı Takibi (AppState)

Kullanıcı seansı başlattığında AppState dinlenir
Uygulama arka plana geçerse dikkat dağınıklığı sayılır ve sayaç duraklatılır
Kullanıcı geri döndüğünde devam ettirme seçeneği sunulur

🔹 3. Raporlar (Dashboard)

Kaydedilmiş seans verilerinin listelenmesi
Günlük toplam odaklanma süresi
Toplam odaklanma süresi
Toplam dikkat dağınıklığı

Grafikler:

Son 7 gün – Bar Chart
Kategori dağılımı – Pie Chart

Kullanılan Teknolojiler

React Native (Expo)
React Navigation (Bottom Tabs)
AppState API
AsyncStorage veya benzeri lokal veritabanı
react-native-chart-kit (Grafikler)

Proje Yapısı (Kısa Özet)
/navigation
    TabNavigator.js

/screens
    HomeScreen.js
    ReportsScreen.js

/components
    Timer.js          (ilerleyen commitlerde eklenecek)
    CategorySelect.js (ilerleyen commitlerde eklenecek)

App.js

Kurulum ve Çalıştırma
Projeyi klonladıktan sonra:
npm install
npm start

Expo açıldıktan sonra Android/iOS cihazınızda projeyi çalıştırabilirsiniz.

📌 Geliştirme Notları

Kodlar component bazlı ve yeniden kullanılabilir şekilde yazılmaktadır.
GitHub’da farklı günlerde en az 10 commit olacak şekilde ilerleme sağlanacaktır.
Her aşama (UI, Timer, AppState entegrasyonu, Grafikler vb.) ayrı commit olarak eklenmektedir.
