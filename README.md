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

### Prasyarat

- Node.js >= 22.11.0
- MySQL 8.x

### Step 1: Install dependencies

```sh
cd backend
npm install
```

### Step 2: Setup environment

```sh
cp .env.example .env
```

Buka `.env` dan isi nilai berikut:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_USER=<mysql_username>
DB_PASSWORD=<mysql_password>
DB_NAME=journify
DB_POOL_LIMIT=20
JWT_SECRET=<generate_dengan_perintah_di_bawah>
JWT_EXPIRES_IN=15m
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=10
```

Generate JWT secret yang aman:

```sh
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Setup MySQL

Buat database dan user — jalankan di MySQL shell:

```sql
CREATE DATABASE journify;
CREATE USER 'journify_user'@'localhost' IDENTIFIED BY 'password_anda';
GRANT ALL PRIVILEGES ON journify.* TO 'journify_user'@'localhost';
FLUSH PRIVILEGES;
```

Buat tabel:

```sql
CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE journals (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  title      VARCHAR(255) NOT NULL,
  content    TEXT NOT NULL,
  date       DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Step 4: Jalankan server

```sh
npm run dev
```

Output yang diharapkan:

```
🚀 Server berjalan di http://localhost:5001
📋 Environment: development
✅ Database connected
```

### API Endpoints

Base URL: `http://localhost:5001`

**Auth**

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/auth/register` | ❌ | Registrasi akun baru |
| POST | `/api/auth/login` | ❌ | Login, mendapatkan token |
| POST | `/api/auth/logout` | ✅ | Logout |

**Journals** — semua memerlukan header `Authorization: Bearer <token>`

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/journals` | Ambil semua jurnal milik user |
| GET | `/api/journals/:id` | Ambil jurnal by ID |
| POST | `/api/journals` | Buat jurnal baru |
| PUT | `/api/journals/:id` | Update jurnal |
| DELETE | `/api/journals/:id` | Hapus jurnal |

**Health Check**

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Cek status server dan database |

### Konfigurasi BASE_URL untuk Mobile

Sesuaikan BASE_URL di frontend berdasarkan environment pengembangan:

| Environment | BASE_URL |
|---|---|
| Android Emulator | `http://10.0.2.2:5001` |
| iOS Simulator | `http://localhost:5001` |
| Physical Device | `http://<IP-komputer-anda>:5001` |

### ⚠️ Security — Axios

Terdapat supply chain attack pada axios npm package (31 Maret 2026). Versi `1.14.1` dan `0.30.4` terinfeksi malware RAT oleh aktor negara Korea Utara (Sapphire Sleet/UNC1069).

**Versi aman yang digunakan: `1.15.0`** — dirilis 8 April 2026 via OIDC Trusted Publishing dengan provenance yang dapat diverifikasi, mengandung patch keamanan SSRF dan header injection yang tidak ada di `1.14.0`.

```sh
# Dari folder app/
yarn add axios@1.15.0 --exact
```

Pastikan `package.json` menampilkan `"axios": "1.15.0"` — tanpa `^` atau `~`.

| Versi | Status |
|---|---|
| `1.14.0` | ✅ Aman (rilis terakhir sebelum serangan) |
| `1.14.1` | ❌ Malware RAT |
| `0.30.4` | ❌ Malware RAT |
| `1.15.0` | ✅ Aman — **versi yang digunakan** |

---

## Troubleshooting

- **App**: lihat halaman [Troubleshooting](https://reactnative.dev/docs/troubleshooting) React Native
- **Backend**:

| Error | Solusi |
|---|---|
| `Database connection failed` | Pastikan MySQL berjalan |
| `Access denied for user` | Periksa `DB_USER` dan `DB_PASSWORD` di `.env` |
| `Port 5001 already in use` | Ganti `PORT` di `.env` atau hentikan proses yang menggunakan port tersebut |
| `JWT_SECRET is undefined` | Pastikan file `.env` sudah diisi dan tersimpan |
