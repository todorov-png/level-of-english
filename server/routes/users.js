import { Router } from 'express';
import User from '../models/User.js';
import { decrypt } from '../../src/lib/encryption.js';

const router = Router();

router.post('/create', async (req, res) => {
    const user = new User(decrypt(req.body.data));
    await user.save();
    res.json({ state: 'success' });
});

router.post('/auth', async (req, res) => {
    const user = decrypt(req.body.data);
    res.json(await User.findOne(user, { password: false, _id: false }));
});

router.get('/:token', async (req, res) => {
    const email = decrypt(req.params.token);
    res.json(await User.findOne({ email }, { password: false, _id: false }));
});

router.put('/:token', async (req, res) => {
    const email = decrypt(req.params.token);
    const user = decrypt(req.body.data);
    await User.updateOne({ email }, user);
    res.json({ state: 'updated' });
});

router.delete('/:token', async (req, res) => {
    const email = decrypt(req.params.token);
    await User.findOneAndRemove({ email });
    res.json({ state: 'deleted' });
});

export default router;
