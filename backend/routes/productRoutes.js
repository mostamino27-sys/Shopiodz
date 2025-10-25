import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', async (req, res) => {
  const { name, price, imageUrl, description } = req.body;
  const product = new Product({ name, price, imageUrl, description });
  await product.save();
  res.json({ success: true, product });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
