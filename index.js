const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

// السيرفر الأساسي المعتمد للرابط الرئيسي
const TARGET_SERVER = 'http://147.135.213.131:20046';

// قائمة السيرفرات الأربعة كاملة لعرضها في الرابط الفرعي /api/servers
const serversList = [
  { id: 1, name: 'السيرفر الأساسي (Bot 1)', url: 'http://147.135.213.131:20046' },
  { id: 2, name: 'السيرفر الثاني (Fares Bot)', url: 'http://51.75.118.151:20283' },
  { id: 3, name: 'السيرفر الثالث (Bot 3)', url: 'http://51.75.118.169:20103' },
  { id: 4, name: 'السيرفر الرابع (Bot 4)', url: 'http://51.75.118.17:20069' }
];

// مسار JSON لعرض قائمة السيرفرات الأربعة
app.get('/api/servers', (req, res) => {
  res.json({
    success: true,
    message: 'روابط السيرفرات الأربعة كاملة',
    servers: serversList
  });
});

// توجيه حركة المرور للسيرفر الأساسي مع دعم الـ WebSockets
app.use('/', createProxyMiddleware({
  target: TARGET_SERVER,
  changeOrigin: true,
  ws: true,
  secure: false,
  onError: (err, req, res) => {
    res.status(500).send('عذراً، حدث خطأ في الاتصال بالسيرفر الأساسي.');
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy Hub is running on port ${PORT}`);
});
