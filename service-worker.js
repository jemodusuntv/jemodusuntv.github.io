const CACHE_NAME = 'kebun-sawit-v1';
const SUPABASE_URL = 'https://suguhkuaoxszaewbicya.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9KvrV7Y8XXF_KBPBaqME3Q_CJSfnhMU';

// Install service worker
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Terima pesan dari app untuk jadwalkan pengecekan
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_CHECK') {
    checkJadwal();
  }
});

// Push notification dari server (opsional)
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Kebun Sawit', {
      body: data.body || 'Ada jadwal yang perlu diperhatikan',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: 'kebun-sawit-notif',
      renotify: true,
      data: { url: data.url || '' }
    })
  );
});

// Klik notifikasi → buka aplikasi
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('kebun-sawit') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('');
    })
  );
});

// Cek jadwal dari Supabase dan kirim notifikasi lokal
async function checkJadwal() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const res = await fetch(
      SUPABASE_URL + '/rest/v1/jadwal_aktif?status=eq.pending&order=tanggal_due',
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
    );
    const jadwal = await res.json();

    const terlewat = [];
    const dekat = [];

    jadwal.forEach(j => {
      const due = new Date(j.tanggal_due + 'T00:00:00');
      const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
      if (diff < 0) terlewat.push({ ...j, diff: Math.abs(diff) });
      else if (diff <= 3) dekat.push({ ...j, diff });
    });

    // Notifikasi panen terlewat — prioritas tertinggi
    const panenTelat = terlewat.filter(j => j.jenis === 'Panen');
    if (panenTelat.length) {
      const lahan = panenTelat.map(j => `${j.lahan} (${j.diff} hari)`).join(', ');
      await self.registration.showNotification('🚨 Panen Terlewat!', {
        body: lahan + ' — Segera catat realisasi panen',
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        tag: 'panen-telat',
        renotify: true,
        requireInteraction: true,
        data: { url: '' }
      });
    }

    // Notifikasi jadwal lain yang terlewat
    const lainTelat = terlewat.filter(j => j.jenis !== 'Panen');
    if (lainTelat.length) {
      const lahan = lainTelat.slice(0, 3).map(j => `${j.lahan} — ${j.jenis}`).join(', ');
      await self.registration.showNotification('⚠️ Jadwal Terlewat', {
        body: lahan,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        tag: 'jadwal-telat',
        renotify: true,
        data: { url: '' }
      });
    }

    // Notifikasi jadwal mendekati (3 hari ke depan)
    if (dekat.length && !panenTelat.length && !lainTelat.length) {
      const lahan = dekat.slice(0, 3).map(j =>
        `${j.lahan} — ${j.jenis === 'Panen' ? 'Panen' : j.detail || j.jenis} (${j.diff === 0 ? 'hari ini' : j.diff + ' hari lagi'})`
      ).join('\n');
      await self.registration.showNotification('📅 Jadwal Mendekati', {
        body: lahan,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        tag: 'jadwal-dekat',
        data: { url: '' }
      });
    }

  } catch (e) {
    console.error('SW checkJadwal error:', e);
  }
}

// Background sync — cek jadwal setiap kali sync
self.addEventListener('periodicsync', e => {
  if (e.tag === 'check-jadwal') {
    e.waitUntil(checkJadwal());
  }
});
