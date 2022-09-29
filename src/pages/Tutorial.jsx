import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getById, reset, update, delTutorial } from '../features/tutorial/tutorialSlice';


const Tutorial = () => {
  const { id } = useParams();
  const { tutorial } = useSelector(state => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({
    title: '',
    description: '',
    published: false,
  });
  const { title, description, published } = updateData;

  const handleInput = (e) => {
    setUpdateData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handlePublish = () => {
    setUpdateData(prev => ({
      ...prev,
      published: published ? false : true
    }))
  }

  const handleSave = () => {
    console.log(updateData)
    dispatch(update(updateData));
    navigate('/');
  }

  const handleDel = () => {
    dispatch(delTutorial(id));
    navigate('/');
  }
  useEffect(() => {
    dispatch(getById(id));
    return () => dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    setUpdateData(tutorial);
  }, [tutorial])

  return (
    <div>

      <div className="edit-form">
        <h4>Tutorial</h4>
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
          className="btn btn-danger mr-2"
          onClick={handleDel}
        >
          Delete
        </button>

        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSave}
        >
          Save
        </button>
        <p></p>
      </div>
    </div>
  );
}

export default Tutorial