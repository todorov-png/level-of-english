import { Router } from 'express';
import Test from '../models/Test.js';
import { decrypt } from '../../src/lib/encryption.js';

const router = Router();

router.get('/', async (req, res) => {
    res.json(await Test.find({}, { name: true, _id: false }));
});

router.get('/:name', async (req, res) => {
    const name = decrypt(req.params.name);
    res.json(await Test.findOne({ name }, { _id: false }));
});

export default router;
