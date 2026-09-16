const express = require('express');
const path = require('path');
const app = express();

// استخدام البورت الذي ترسله منصة Railway تلقائياً
const PORT = process.env.PORT || 3000;

// السماح بقراءة الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// مسار افتراضي يفتح صفحة الـ index أو لوحة التحكم
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
