const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to DB")
})
.catch((error)=>{
    console.log("Error",error)
});

const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: String,
});

const budgetSchema = new mongoose.Schema({
  category: String,
  month: String,
  budgetAmount: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const Budget = mongoose.model('Budget', budgetSchema);

app.get('/transactions', async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  res.json(data);
});

app.post('/transactions', async (req, res) => {
  const newTx = new Transaction(req.body);
  await newTx.save();
  res.json(newTx);
});

app.put('/transactions/:id', async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/transactions/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.get('/budgets', async (req, res) => {
  const data = await Budget.find();
  res.json(data);
});

app.post('/budgets', async (req, res) => {
  const newBudget = new Budget(req.body);
  await newBudget.save();
  res.json(newBudget);
});

app.listen(5000, () => console.log('Server running on port 5000'));
