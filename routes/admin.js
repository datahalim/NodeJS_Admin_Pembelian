const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        db.query('SELECT * FROM Produk', (err, produk) => {
            if (err) throw err;

            db.query(
                'SELECT p.id, pr.nama_produk, p.jumlah, p.status FROM Pembelian p JOIN Produk pr ON p.produk_id = pr.id',
                (err2, pembelian) => {
                    if (err2) throw err2;

                    res.render('index', { produk, pembelian });
                }
            );
        });
    });

    // CANCEL PEMBELIAN (POST)
    router.post('/cancel/:id', (req, res) => {
        const pembelian_id = req.params.id;

        db.query(
            'UPDATE Pembelian SET status="dibatalkan" WHERE id=?',
            [pembelian_id],
            (err) => {
                if (err) throw err;
                res.redirect('/');
            }
        );
    });

    return router;
};
