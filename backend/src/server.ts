import 'dotenv/config';
import app from './app';
import db from './config/db';

const PORT = parseInt(process.env.PORT ?? '5001');

// Inisialisasi koneksi database
db.createPool();

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Environment: development`);
});
