import express from 'express';
import { createInvoice, getInvoices, updateInvoice, deleteInvoice } from '../controllers/invoiceController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createInvoice);
router.get('/', authenticateToken, getInvoices);
router.put('/:id', authenticateToken, updateInvoice);
router.delete('/:id', authenticateToken, deleteInvoice);

export default router;

