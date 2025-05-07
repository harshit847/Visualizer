import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import './app.css';

const categories = ['Food', 'Transport', 'Utilities', 'Shopping', 'Other'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC'];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ amount: '', date: '', description: '', category: 'Food' });

  const fetchTransactions = async () => {
    const res = await axios.get('http://localhost:5000/transactions');
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/transactions', form);
    setForm({ amount: '', date: '', description: '', category: 'Food' });
    fetchTransactions();
  };

  const monthlyData = Object.values(
    transactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = acc[month] || { month, total: 0 };
      acc[month].total += tx.amount;
      return acc;
    }, {})
  );

  const categoryData = categories.map(cat => ({
    name: cat,
    value: transactions.filter(tx => tx.category === cat).reduce((sum, tx) => sum + tx.amount, 0),
  }));

  return (
    <div className="tracker">
      <h1 className="finance">Personal Finance Tracker</h1>

      <form className="submitbtn" onSubmit={handleSubmit}>
        <input required className="number" type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} />
        <input required className="date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input required className="value" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <select className="catlog" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <button className="addbtn">Add</button>
      </form>

      <h2 className="transac">Transactions</h2>
      <ul className="mb-6">
        {transactions.map(tx => (
          <li key={tx._id} className="border-b py-2">
            {tx.date.slice(0, 10)} - ₹{tx.amount} - {tx.description} [{tx.category}]
          </li>
        ))}
      </ul>

      <div className="month">
        <div>
          <h3 className="expense">Monthly Expenses</h3>
          <BarChart width={350} height={250} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h3 className="category">Category Breakdown</h3>
          <PieChart width={350} height={250}>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default App;
