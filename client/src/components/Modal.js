import { useState } from "react";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : 'tennyson@test.com',
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date()
  });

  // SENDING DATA TO THE DATABASE
  const postData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.statusCode === 200) {
        console.log('Here is the response');
        setShowModal(false);
        getData()
      } 
    } catch (err) {
      console.error(err);
    }
  }
  //END OF SENDING DATA TO THE DATABASE

  const handleChange = (e) => {
    
    const { name, value } = e.target;

    // setData({...data, [name]: value });

    // or use this.handle
    setData((data) => ({
      ...data,
      [name]: value
    }))

    console.log(data);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task.</h3>
          <button
            onClick={() => setShowModal(false)}
            className="">
            X
          </button>
        </div>
        <form className="modal-form">
          <input
            type="text"
            maxLength={30}
            placeholder="Add task here" 
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="">Drag to update your progress</label>
          <input
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            placeholder="Description"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit" onClick={editMode ? '': postData} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
