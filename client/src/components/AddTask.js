import React from "react";
import { useState } from "react";

const AddTask = ({ onAdd, user }) => {
  let todaysDate = new Date();
  todaysDate.setDate(todaysDate.getDate());
  let date = todaysDate.toISOString().slice(0, 10);

  const [description, setDescription] = useState("");
  const [due_by, setDue_by] = useState(date);
  const [reminder, setReminder] = useState(false);
  const [category, setCategory] = useState("1");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description || !due_by) {
      alert("Please complete all fields");
      return;
    }

    const taskObj = {
      description: description,
      reminder: reminder,
      due_by: due_by,
      category_id: parseInt(category),
      user_id: user.id,
    };

    onAdd(taskObj);
    setDescription("");
    setDue_by("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Due By Date</label>
        <input
          type="date"
          value={due_by}
          onChange={(e) => setDue_by(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Select Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="1">Miscellaneous</option>
          <option value="2">Exercise</option>
          <option value="3">Shopping</option>
          <option value="4">Chores</option>
          <option value="5">Personal</option>
          <option value="6">Work</option>
        </select>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          // value = {reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
