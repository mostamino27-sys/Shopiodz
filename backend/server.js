import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import pdf from 'pdfkit';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('YOUR_MONGODB_URI_HERE', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ Database connection error:', err));

app.get('/api/v1/products', (req, res) => {
  res.json([{ _id: 1, name: 'منتج تجريبي', price: 2500, imageUrl: 'https://via.placeholder.com/200' }]);
});

app.post('/api/v1/order/pdf', (req, res) => {
  const { orderId, products, total } = req.body;
  const filename = `Invoice_${orderId}.pdf`;
  const doc = new pdf();

  doc.pipe(fs.createWriteStream(filename));
  doc.fontSize(20).text(`فاتورة الطلب رقم: ${orderId}`, { align: 'center' });
  doc.moveDown();
  products.forEach((p, i) => doc.text(`${i + 1}. ${p.name} - ${p.price} د.ج`));
  doc.text(`\nإجمالي الطلب: ${total} د.ج`, { align: 'right' });
  doc.end();

  res.json({ success: true, file: filename });
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
