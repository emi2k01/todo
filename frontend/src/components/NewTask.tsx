import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions";

function NewTask() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const submitTask = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(addTask(title)); 
        e.currentTarget.reset();
        e.preventDefault();
    }

    const onTaskInput = (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        <form onSubmit={submitTask}>
            <input placeholder="What's your next task?" onInput={onTaskInput}/>
        </form>
    );
}

export default NewTask;
