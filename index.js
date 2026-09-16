const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 3000;

// رابط سيرفرك الأساسي على Katabump
const TARGET_SERVER = 'http://51.75.118.151:20283';

// قائمة السيرفرات الأربعة الخاصة بك لعرضها في لوحة التحكم أو الروابط الموحدة
const serversList = [
    { id: 1, name: 'السيرفر الأول (Bot 1)', url: 'http://147.135.213.131:20046' },
    { id: 2, name: 'السيرفر الثاني (Fares Bot - الأساسي)', url: 'http://51.75.118.151:20283' },
    { id: 3, name: 'السيرفر الثالث (Bot 3)', url: 'http://51.75.118.169:20103' },
    { id: 4, name: 'السيرفر الرابع (Bot 4)', url: 'http://51.75.118.17:20069' }
];

// مسار خاص لإظهار قائمة روابط السيرفرات الأربعة بصيغة JSON أو صفحة سريعة
app.get('/api/servers', (req, res) => {
    res.json({
        success: true,
        message: 'روابط السيرفرات الأربعة كاملة',
        servers: serversList
    });
});

// توجيه كل حركة المرور (Traffic) والموقع والملفات من Railway إلى سيرفرك الأصلي على Katabump بالخلفية
app.use('/', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    ws: true, // لدعم الـ WebSockets والاتصالات المباشرة للبوتات واللوحة
    secure: false,
    onError: (err, req, res) => {
        res.status(500).send(`
            <div style="font-family: Tahoma; text-align: center; margin-top: 50px; color: #ff4757;">
                <h2>عذراً، تعذر الاتصال بسيرفر البوت الأساسي على Katabump</h2>
                <p>تأكد أن السيرفر يعمل بشكل صحيح وأن البورت مفتوح.</p>
            </div>
        `);
    }
}));

app.listen(PORT, () => {
    console.log(`Railway Proxy & Server Hub is running on port ${PORT}`);
});
