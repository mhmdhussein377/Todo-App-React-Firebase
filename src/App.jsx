import './App.css'
import {AiOutlinePlus} from "react-icons/ai"
import Todo from './Todo'
import {useState} from 'react'
import {useEffect} from 'react';
import {db} from "./firebase"
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';

function App() {

    let [todos,
        setTodos] = useState([]);
    let [inputValue,
        setInputValue] = useState("");

    let handleChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        let q = query(collection(db, "todos"));
        let unsubscribe = onSnapshot(q, (docs) => {
            let todosArr = [];
            docs.forEach((doc) => {
                todosArr.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setTodos(todosArr);
        });

        return () => unsubscribe();
    }, []);

    let handleSubmit = async(e) => {
        e.preventDefault();

        if (inputValue === "") {
            alert("Please enter a valid todo");
            return;
        }

        await addDoc(collection(db, "todos"), {
            text: inputValue,
            completed: false
        });

        setInputValue("");
    };

    let toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {
            completed: !todo.completed
        });
    };

    let deleteTodo = async (id) => {
      await deleteDoc(doc(db, "todos", id));
    };

    return (
      <div className="h-screen w-screen p-4 bg-gradient-to-r  from-[#2F80ED] to-[#1CB5E0]">
        <div className="max-w-[500px] mx-auto bg-slate-100 w-full rounded-md shadow-xl p-4">
          <h3 className="text-3xl text-center font-bold text-gray-800 p-2">
            Todo App
          </h3>
          <form
            className="flex justify-between gap-4 mb-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Add todos"
              className="w-full border p-2 focus:outline-none text-xl"
            />
            <button className="p-3 bg-violet-700 text-white">
              <AiOutlinePlus size={30} />
            </button>
          </form>
          <ul className="flex flex-col gap-2">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          {todos.length < 1 ? null : (
            <p className="text-center p-2">You have {todos.length} todos</p>
          )}
        </div>
      </div>
    );
}

export default App
