# Journify

Aplikasi mobile daily journaling. Mono-repo ini berisi dua sub-project: **app** (React Native) dan **backend** (Express.js).

```
journify/
├── app/        # React Native (TypeScript)
└── backend/    # Express.js + MySQL
```

---

## App (React Native)

> **Prasyarat**: Pastikan sudah menyelesaikan panduan [Setup Your Environment](https://reactnative.dev/docs/set-up-your-environment) sebelum melanjutkan.

### Step 1: Start Metro

Jalankan Metro — JavaScript build tool untuk React Native — dari dalam folder `app/`:

```sh
cd app

# npm
npm start

# atau Yarn
yarn start
```

### Step 2: Build dan jalankan app

Dengan Metro berjalan, buka terminal baru dari folder `app/` dan jalankan salah satu perintah berikut:

**Android**

```sh
# npm
npm run android

# atau Yarn
yarn android
```

**iOS**

Untuk iOS, install CocoaPods dependencies terlebih dahulu. Jalankan ini sekali saat pertama kali clone atau setelah mengupdate native dependencies:

```sh
# Install CocoaPods (hanya pertama kali)
bundle install

# Install native dependencies
bundle exec pod install
```

Kemudian jalankan app:

```sh
# npm
npm run ios

# atau Yarn
yarn ios
```

> Referensi: [CocoaPods Getting Started](https://guides.cocoapods.org/using/getting-started.html)

### Step 3: Modifikasi app

Buka `app/App.tsx` di editor pilihanmu. Setiap kali disimpan, app akan otomatis memperbarui tampilan — ini didukung oleh [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Untuk melakukan full reload:

- **Android**: Tekan <kbd>R</kbd> dua kali, atau buka **Dev Menu** via <kbd>Ctrl</kbd>+<kbd>M</kbd> (Windows/Linux) / <kbd>Cmd ⌘</kbd>+<kbd>M</kbd> (macOS), lalu pilih **"Reload"**
- **iOS**: Tekan <kbd>R</kbd> di iOS Simulator

---

## Backend (Express.js)

> Dokumentasi setup backend akan ditambahkan di sini.

---

## Troubleshooting

- **App**: lihat halaman [Troubleshooting](https://reactnative.dev/docs/troubleshooting) React Native
- **Backend**: *(akan ditambahkan)*
