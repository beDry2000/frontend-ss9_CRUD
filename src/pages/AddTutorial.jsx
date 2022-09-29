import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { create } from '../features/tutorial/tutorialSlice';

const AddTutorial = () => {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: '',
    description: '',
    published: false,
  });

  const { title, description, published } = input;

  const handleInput = (e) => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handlePublish = () => {
    setInput(prev => ({
      ...prev,
      published: published ? false : true
    }))
  }

  const handleAdd = () => {
    dispatch(create(input));
    setInput({
      title: '',
      description: '',
      published: false,
    })
  }

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [dispatch]);


  return (
    <div>

      <div className="edit-form">
        <h4>Add Tutorial</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              name="title"
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              name="description"
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {published ? <span>Published</span> : <span>Pending</span>}
          </div>
        </form>

        <button
          className="btn btn-primary mr-2"
          onClick={handlePublish}
        >
          {published ? "Discard" : "Publish"}
        </button>

        <button
          type="submit"
          className="btn btn-success"
          onClick={handleAdd}
        >
          Save
        </button>
        <p></p>
      </div>
    </div>
  )
}

export default AddTutorial