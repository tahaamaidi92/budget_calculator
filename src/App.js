import React,{useState , useEffect} from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
 //const initialExpenses = [
   //{ id: uuidv4(), charge: "rent", amount: 1600 },
   //{ id: uuidv4(), charge: "car payment", amount: 400 },
   //{
     //id: uuidv4(),
     //charge: "credit card bill ",
     //amount: 1200
   //}
 //];
 const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  // ************* state values *******************
  // all expenses, add expense
  const [expenses , setExpenses] = useState(initialExpenses);
  // single expense
  const [charge , setCharge] = useState('');
  // single amount
  const [amount , setAmount] = useState('');
  // alert
  const [alert , setAlert] = useState({show:false});
  //edit
  const [edit , setEdit] = useState(false);
  //edit Item
  const [id , setId] = useState(0);

  useEffect(() => {
    console.log("called");

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  // ************* functionnality ******************
  //handle charge
  const handleCharge = e =>{
    setCharge(e.target.value)
  }
  //handle amount
  const handleAmount = e =>{
    setAmount(e.target.value)
  }
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };
  //handle submit
  const handleSubmit = e =>{
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      // set charge back to empty string
      setCharge("");
      // set amount back to zero
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`
      });
    }
  };
  //Clear Items
  const celarItems = () => {
    setExpenses([]);
  }
  //handle deleted
  const handleDelete = (id) =>{
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  }
  // handle edited 
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
      <ExpenseForm 
      charge={charge}
      amount={amount}
      handleCharge={handleCharge}
      handleAmount={handleAmount}
      handleSubmit={handleSubmit}
      edit={edit}
      />
      <ExpenseList 
      expenses={expenses}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      celarItems={celarItems}
      />
      </main>
      <h1>
        total sending : {" "} 
        <span className="total">
          $
          {expenses.reduce((acc,curr)=>{
            return (acc += parseInt(curr.amount));
          },0)}
        </span>
      </h1>
      
    </div>
  );
}

export default App;
