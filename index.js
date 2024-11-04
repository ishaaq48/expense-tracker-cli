const {Command} = require('commander')
const Expense = require('./db')

const program = new Command()

program
    .version('1.0.0')
    .description('Expense Tracker CLI Application')


program
    .command('add')
    .requiredOption('--description <description>','Expense description')
    .requiredOption('--amount <amount>', 'Expense amount')
    .action(async(options)=>{
       const expense = new Expense(
        {
            description: options.description,
            amount: Number(options.amount)
        })
        await expense.save()
        console.log("Expense added successfully")
    })

program
    .command('list')
    .action(async () =>{
        const expenses = await Expense.find({})
        console.log('# ID                       Date        Description  Amount')
        expenses.forEach(exp =>{
            console.log(`#${exp._id}  ${exp.date.toISOString().split('T')[0]}   ${exp.description}          ${exp.amount} `)
        })
    })

program
    .command('delete')
    .requiredOption('--id <id>', 'Expense ID')
    .action(async(exp)=>{
        await Expense.deleteOne({_id : exp.id})
        console.log('Expense deleted successfully')
    })

program
    .command('summary')
    .action(async()=>{
        let sum = 0
        const expenses = await Expense.find({})
        expenses.forEach(exp =>{
            sum += exp.amount
        })
        console.log(`Total expense: ${sum}`)
    })

    program.parse(process.argv);