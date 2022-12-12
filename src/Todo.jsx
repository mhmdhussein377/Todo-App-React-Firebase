import React from 'react'
import {FaRegTrashAlt} from "react-icons/fa"

const Todo = ({todo, toggleComplete, deleteTodo}) => {
    return (
        <li
            className={`flex items-center justify-between p-3 bg-slate-200 capitalize ${todo.completed && "bg-slate-400"}`}>
            <div className="flex gap-2 font-medium text-lg">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => toggleComplete(todo)}
                    checked={todo.completed
                    ? "checked"
                    : ""}/>
                <p
                    className={`cursor-pointer ${todo.completed && "line-through"}`}
                    onClick={() => toggleComplete(todo)}>
                    {todo.text}
                </p>
            </div>
            <button onClick={() => deleteTodo(todo.id)}>
                <FaRegTrashAlt size={20}/>
            </button>
        </li>
    );
};

export default Todo