const express = require('express');
const app = express();

app.get('/redirect', (req, res) => {
    const userAgent = req.headers['user-agent'].toLowerCase();
    if (userAgent.includes('android')) {
        // Redirect to Google Play or open the app if installed
        res.redirect('intent://yourapp#Intent;scheme=yourappscheme;package=com.yourapp.package;end');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // Redirect to App Store or open the app if installed
        res.redirect('yourappscheme://');
    } else {
        res.send('Sistema operacional não suportado.');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

