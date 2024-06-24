// routes/matakuliah.js

const express = require('express');
const router = express.Router();
const Matakuliah = require('../models/matakuliah');

// Route untuk menampilkan semua matakuliah
router.get('/', async (req, res) => {
    try {
        const matkuls = await Matakuliah.findAll();
        res.render('matakuliah', { matkuls });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    }
});

// Route untuk menampilkan form tambah matakuliah
router.get('/create', (req, res) => {
    res.render('create_matakuliah');
});

// Route untuk menyimpan matakuliah baru dari form
router.post('/', async (req, res) => {
    try {
        const { kode_matkul, matkul, kelas, dosen, jumlah_mahasiswa } = req.body;
        await Matakuliah.create({ kode_matkul, matkul, kelas, dosen, jumlah_mahasiswa });
        res.redirect('/matkul');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating matakuliah');
    }
});

router.get('/search', async (req, res) => {
    try {
        const search = req.query.search;
        // Lakukan pencarian berdasarkan nilai search di database menggunakan Sequelize
        const results = await Matakuliah.findAll({
            where: {
                // Definisikan kondisi pencarian di sini
                // Misalnya, mencari di kolom 'matkul' yang cocok dengan nilai 'search'
                matkul: {
                    [Sequelize.Op.like]: `%${search}%` // Menggunakan operator like untuk pencarian substring
                }
            }
        });
        res.render('matakuliah', { matkuls: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error searching for matkuls');
    }
});


// Route untuk menghapus matakuliah
router.post('/:id/delete', async (req, res) => {
    try {
        await Matakuliah.destroy({ where: { id: req.params.id } });
        res.redirect('/matakuliah');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting matakuliah');
    }
});

module.exports = router;
