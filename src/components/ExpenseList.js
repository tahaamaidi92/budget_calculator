import React from 'react'
import Item from "./ExpenseItem"
import {MdDelete} from "react-icons/md"
export const ExpenseList = ({expenses, handleEdit, handleDelete, celarItems}) => {
    return (
        <>
        <ul className="list">
            {
                expenses.map((expense)=>{
                 return <Item 
                 key={expense.id} 
                 expense={expense}
                 handleDelete={handleDelete}
                 handleEdit={handleEdit}
                 />
                })
            }

        </ul>
           {expenses.length > 0 && (
               <button className="btn" onClick={celarItems}>
                clear expenses
                 <MdDelete className="btn-icon"/>
               </button>
           )} 
        </>
    )
}

export default ExpenseList