import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.data : new Date()
  });

  // SENDING DATA TO THE DATABASE
  const postData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      } 
    } catch (error) {
      console.error(error);
    }
  }

  const editData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      console.log(response);
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    
    const { name, value } = e.target;

    setData({...data, [name]: value });

    // or use this
    // setData((data) => ({
    //   ...data,
    //   [name]: value
    // }))

    console.log(data);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task.</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form className="modal-form">
          <input
            maxLength={30}
            placeholder="Add task here" 
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="range">Drag to update your progress</label>
          <input
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
