const express = require('express');
const router = express.Router();
const Mahasiswa = require('../models/mahasiswa'); // Sesuaikan dengan lokasi dan penamaan model Anda
const { Op } = require('sequelize');

// Route untuk menampilkan semua mahasiswa
router.get('/', async (req, res) => {
    try {
        const mahasiswas = await Mahasiswa.findAll();
        res.render('mahasiswa', { mahasiswas });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    }
});

// Route untuk menampilkan form tambah mahasiswa
router.get('/create', (req, res) => {
    res.render('create_mahasiswa');
});

// Route untuk menyimpan mahasiswa baru dari form
router.post('/', async (req, res) => {
    try {
        const { nim, nama, status_pendaftaran, nilai, daftar_nilai } = req.body;
        await Mahasiswa.create({ nim, nama, status_pendaftaran, nilai, daftar_nilai });
        res.redirect('/mahasiswa');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating mahasiswa');
    }
});

// Route untuk melakukan pencarian mahasiswa
router.get('/search', async (req, res) => {
    try {
        const search = req.query.search;
        // Lakukan pencarian berdasarkan nilai search di database menggunakan Sequelize
        const results = await Mahasiswa.findAll({
            where: {
                [Op.or]: [
                    { nim: { [Op.like]: `%${search}%` } },
                    { nama: { [Op.like]: `%${search}%` } },
                    { status_pendaftaran: { [Op.like]: `%${search}%` } }
                ]
            }
        });
        res.render('mahasiswa', { mahasiswas: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error searching for mahasiswa');
    }
});

// Route untuk menampilkan detail mahasiswa berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findByPk(req.params.id);
        if (!mahasiswa) {
            res.status(404).send('Mahasiswa not found');
        } else {
            res.render('mahasiswa/detail', { mahasiswa });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching mahasiswa');
    }
});

// Route untuk menampilkan form edit mahasiswa
router.get('/:id/edit', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findByPk(req.params.id);
        if (!mahasiswa) {
            res.status(404).send('Mahasiswa not found');
        } else {
            res.render('mahasiswa/edit', { mahasiswa });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching mahasiswa');
    }
});

// Route untuk menyimpan perubahan pada mahasiswa
router.post('/:id/edit', async (req, res) => {
    try {
        const { nim, nama, status_pendaftaran, nilai, daftar_nilai } = req.body;
        const mahasiswa = await Mahasiswa.findByPk(req.params.id);
        if (!mahasiswa) {
            res.status(404).send('Mahasiswa not found');
        } else {
            await mahasiswa.update({ nim, nama, status_pendaftaran, nilai, daftar_nilai });
            res.redirect(`/mahasiswa/${req.params.id}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating mahasiswa');
    }
});

// Route untuk menghapus mahasiswa
router.post('/:id/delete', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findByPk(req.params.id);
        if (!mahasiswa) {
            res.status(404).send('Mahasiswa not found');
        } else {
            await mahasiswa.destroy();
            res.redirect('/mahasiswa');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting mahasiswa');
    }
});

module.exports = router;
