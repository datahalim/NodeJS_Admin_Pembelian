const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Set EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'toko'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

// ROUTES HARUS SETELAH DB TERBUAT
const adminRoutes = require('./routes/admin')(db);

// <- INI YANG PALING PENTING
app.use('/', adminRoutes);

// SERVER
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
