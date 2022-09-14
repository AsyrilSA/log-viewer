import {useState} from 'react';

const ExpenseForm = (props) => {
    // const [userInput, setUserInput] = useState({
    //     enteredTitle:'',
    //     enteredAmout:'',
    // })
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler=(event)=>{
        setEnteredTitle(event.target.value)
        // setUserInput({
        //     ...userInput,
        //     enterendTitle:e.target.value
        // })
        // setUserInput((prevState)=>{
        //     return {...prevState,enteredTitle:e.target.value}
        // })
        console.log(event.target.value +': title value!')
    }
    const dateChangeHandler=(event)=>{
        setEnteredDate(event.target.value)
    }   
    const amountChangeHandler=(event)=>{
        setEnteredAmount(event.target.value)
    }   
    const submitHandler = (event) =>{
        event.preventDefault();
        const expenseData ={
            title:enteredTitle,
            amount:enteredAmount,
            date:new Date(enteredDate)
        }
        props.onSaveExpenseData(expenseData);
        setEnteredTitle('')
        setEnteredAmount('')
        setEnteredDate('')
    };
    
    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Title</label>
                <input 
                    type='text'
                    value={enteredTitle} 
                    onChange={titleChangeHandler}/>
            </div>
            <div>
                <label>Amout</label>
                <input 
                    type='number'
                    min='0.01'
                    step='0.01'
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                />
            </div>
            <div>
                <label>Date</label>
                <input 
                    type='date'
                    min='2019-01-01'
                    max='2023-01-01'
                    value ={enteredDate}
                    onChange={dateChangeHandler}
                />
            </div>
            <div>
                <button type='submit'>Add expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;