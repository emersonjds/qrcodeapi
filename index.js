const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const corsOptions = {
    origin: 'https://portonetqrcode.netlify.app/',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get('/test', (req, res) => {
    res.json('Hello World')
});

app.get('/', cors(corsOptions), (req, res) => {

    const userAgent = req.headers['user-agent'].toLowerCase();

    const appPackage = 'br.com.portoseguro.portonetmobile';
    const scheme = 'portonet://abrirappportonet';
    const playStoreUrl = `https://play.google.com/store/apps/details?id=br.com.portoseguro.portonetmobile&hl=pt_BR`;

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.headers.origin && ['http://localhost:3000', 'http://localhost:3001'].includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }

    if (userAgent.includes('android')) {
        // Redirect to Google Play or open the app if installed
        // res.redirect('intent://portonet#Intent;scheme=portonet://abrirappportonet;package=com.yourapp.package;end');
        res.redirect(`intent://${scheme}#Intent;scheme=portonet;package=${appPackage};S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`);
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        res.redirect(`www.google.com.br`);
    } else {
        res.send('Sistema operacional não suportado.');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

