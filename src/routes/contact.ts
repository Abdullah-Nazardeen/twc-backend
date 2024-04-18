import express, { Router } from 'express';
import authenticateJWT from '../middleware/authenticate';
import { createContact, updateContact, getAllContacts, deleteContact } from '../controllers/contact';

const router: Router = express.Router();

router.post('/contacts', authenticateJWT, createContact);
router.put('/contacts/:id', authenticateJWT, updateContact);
router.get('/contacts', authenticateJWT, getAllContacts);
router.delete('/contacts/:id', authenticateJWT, deleteContact);

export default router;
