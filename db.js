const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://syedishaaq48:TzIOadhTNpmH2Nf5@cluster0.8meqy.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {console.log('Connected!')})
  .catch(()=>{console.log('Connection failed')})


  const expenseSchema = new mongoose.Schema(
    {
        description: String,
        amount: Number,
        date: { 
            type: Date,
            default: Date.now
        },
        category: String,
    }
  )

  const Expense = mongoose.model('Expense', expenseSchema)

  module.exports = Expense