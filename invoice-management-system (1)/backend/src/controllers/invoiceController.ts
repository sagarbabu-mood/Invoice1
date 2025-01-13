import { Request, Response } from 'express';
import Invoice from '../models/Invoice';

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const newInvoice = new Invoice({
      ...req.body,
      userId: req.user._id
    });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: 'Error creating invoice', error });
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: 'Error updating invoice', error });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const deletedInvoice = await Invoice.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice', error });
  }
};

