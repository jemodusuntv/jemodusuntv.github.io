// ============================================================
//  CONFIG - Edit file ini untuk update data platform
//  YouTube subscriber & views otomatis dari API
//  Platform lain: edit angka di sini lalu simpan
// ============================================================

const CONFIG = {

  // === PROFIL ===
  name: "JemoDusunTV",
  location: "Bengkulu – Sumatera, Indonesia",
  tagline: "Channel outdoor & petualangan sungai yang merekam keindahan alam secara autentik — dari memancing di pedalaman hingga menjelajahi jalur air yang belum pernah dieksplor.",
  niche: ["Outdoor & Alam", "Petualangan Sungai", "Memancing","Camping"],

  // === KONTAK ===
  email: "jemodusuntv@gmail.com",
  youtube_url: "https://www.youtube.com/@jemodusuntv/",

  // === YOUTUBE API ===
  // Dapatkan API key gratis di: https://console.cloud.google.com
  // Enable "YouTube Data API v3" lalu buat API Key
  youtube_api_key: "AIzaSyAsEOhRclDQClk7T2hILzY_X0-mUG48tk8",
  youtube_channel_id: "UCiuEntdrBwtjx0ZWNMNbEvA", // Ganti dengan Channel ID asli Anda

  // === DATA MANUAL (update berkala) ===
  // Format: angka asli, tampilan otomatis diformat
  stats: {
    total_views:     145941507,   // Total views lifetime
    viral_views:     4800000,     // Views video terviral
    avg_views:       300000,      // Rata-rata per video
    monthly_views:   4000000,     // Penonton per bulan
  },

  platforms: [
    { name: "YouTube",   followers: 492000,   color: "#cc0000",  bg: "#ffecec", icon: "yt" },
    { name: "Facebook",  followers: 1700000,  color: "#1877f2",  bg: "#e8f0fe", icon: "fb" },
    { name: "TikTok",    followers: 861000,   color: "#000000",  bg: "#f0f0f0", icon: "tt" },
    { name: "Instagram", followers: 126000,   color: "#c13584",  bg: "#fce4f0", icon: "ig" },
  ],

  // === KOLABORASI ===
  collabs: [
    {
      icon: "🎬",
      title: "Dedicated Video",
      desc: "Video penuh menampilkan produk dalam skenario petualangan nyata di alam Sumatera"
    },
    {
      icon: "📦",
      title: "Product Placement",
      desc: "Integrasi produk natural di konten reguler outdoor & memancing"
    },
    {
      icon: "⭐",
      title: "Review & Unboxing",
      desc: "Ulasan jujur & autentik dari perspektif pengguna lapangan langsung"
    },
    {
      icon: "📱",
      title: "Social Media Post",
      desc: "Konten promosi di Facebook, TikTok & Instagram dengan jangkauan jutaan"
    },
    {
      icon: "🎣",
      title: "Field Testing",
      desc: "Uji produk langsung di kondisi alam nyata — sungai, danau, hutan Sumatera"
    },
    {
      icon: "🤝",
      title: "Brand Ambassador",
      desc: "Kerjasama jangka panjang sebagai wajah brand di niche outdoor Indonesia"
    },
  ]
};
