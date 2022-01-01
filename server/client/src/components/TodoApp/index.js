import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./index.css";
const { API } = require("../config/" + process.env.NODE_ENV);

function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [editTaskId, setEditTaskId] = useState("");
  const [inputValueErr, setInputValueErr] = useState(false);
  const [taskData, setTaskData] = useState([]);
  async function loadTodo() {
    const result = await axios.get(API.TODO_END_POINT);
    setTaskData(result.data);
  }
  useEffect(function () {
    // this will run only once on file load
    // loadTodo();
  }, []);
  async function updateTodoList(taskItem) {
    const result = await axios.post(API.TODO_END_POINT, taskItem);
    loadTodo();
  }
  function handleSubmit() {
    // if input value is empty then show error
    if (inputValue === "") {
      setInputValueErr(true);
    } else {
      setInputValueErr(false);
      const oldTaskList = [...taskData];
      const currentTaskItem = {
        id: Math.floor(Math.random() * 100),
        value: inputValue,
        isChecked: false
      };
      //api call from here to send data to server.
      //oldTaskList.push(currentTaskItem);
      // setTaskData(oldTaskList);
      updateTodoList(currentTaskItem);
    }
    setInputValue("");
  }
  function handleCheck(event, currentClickedItemId) {
    const newData = taskData.map(function (task) {
      // if currenClicked id matched with stored tasks id then only change isChecked
      if (task.id === currentClickedItemId) {
        return { ...task, isChecked: event.target.checked };
      } else {
        // otherwise return object as it is
        return task;
      }
    });
    setTaskData(newData);
  }
  function handleEdit(task) {
    setEditTaskId(task.id);
    setEditInputValue(task.value);
    // show input box to edit value
    // when edit button is clicked then user should see input box with save button
  }
  async function postEditData(task) {
    task.value = editInputValue;
    const result = await axios.put(`${API.TODO_END_POINT}/${editTaskId}`, task);
    setEditTaskId("");
    loadTodo();
  }
  function printTasks(inputArray) {
    return inputArray.map(function (task, key) {
      return (
        <li key={key} className={`list-group-item ${task.isChecked ? "completed" : ""}`}>
          <div id={task.id} className="d-flex align-items-center">
            <div className="col-sm-9">
              <input
                className="cursor-pointer mx-2"
                type="checkbox"
                checked={task.isChecked}
                onClick={event => handleCheck(event, task.id)}
              />
              {editTaskId === task.id ? (
                <>
                  <input
                    onChange={event => setEditInputValue(event.target.value)}
                    value={editInputValue}
                  />
                  <button
                    onClick={() => {
                      setEditInputValue(task.value);
                      setEditTaskId("");
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={() => postEditData(task)}>Save New Value</button>
                </>
              ) : (
                <span>{task.value}</span>
              )}
            </div>
            <button
              className="btn btn-danger mx-2 d-flex align-items-center"
              onClick={() => handleDelete(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                ></path>
              </svg>
            </button>
            <button
              className="btn btn-info mx-2 d-flex align-items-center"
              onClick={() => handleEdit(task)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </button>
          </div>
        </li>
      );
    });
  }
  async function handleDelete(currentClickedItemId) {
    //api call and send currentclickeditemid
    const result = await axios.delete(`${API.TODO_END_POINT}/${currentClickedItemId}`);
    loadTodo();
    // const filteredArray = taskData.filter(function (data) {
    //   return data.id !== currentClickedItemId;
    // });
    // setTaskData(filteredArray);
  }
  async function handleDeleteAll() {
    setTaskData([]);
  }
  function getFilteredTask(isChecked) {
    return taskData.filter(function (item) {
      return item.isChecked === isChecked;
    });
  }
  return (
    <div className="container todoContainer my-10">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-6 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="add details"
            value={inputValue}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                handleSubmit();
              }
            }}
            onChange={event => setInputValue(event.target.value)}
          />
          {inputValueErr && (
            <span className="text-danger text-left posAbsolute">Task should not be empty</span>
          )}
          <button
            className="btn btn-primary col-sm-2 mx-3 d-flex align-items-center"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle-fill mx-2"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
            Add
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <Tabs className="tabWrapper col-sm-6">
          <TabList class="row">
            <Tab class="col-sm-3">All Tasks ({taskData.length})</Tab>
            <Tab class="col-sm-3">Active Tasks</Tab>
            <Tab class="col-sm-3">completed Tasks</Tab>
          </TabList>
          <TabPanel>
            <ul className="list-group p-3">{printTasks(taskData)}</ul>
            {taskData.length !== 0 ? (
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-danger mx-2 d-flex align-items-center"
                  onClick={handleDeleteAll}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash mx-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    ></path>
                  </svg>
                  Delete All
                </button>
              </div>
            ) : (
              <p>You have no task added</p>
            )}
          </TabPanel>
          <TabPanel>
            <ul className="list-group p-3">{printTasks(getFilteredTask(false))}</ul>
          </TabPanel>
          <TabPanel>
            <ul className="list-group p-3">{printTasks(getFilteredTask(true))}</ul>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default TodoApp;
