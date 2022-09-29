import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll, reset } from '../features/tutorial/tutorialSlice';

const TutorialList = () => {

  const [currentTutorial, setCurrentTutorial] = useState({});
  const [title, setTitle] = useState('');

  const { user } = useSelector(state => state.auth);
  const { tutorials, isError, message, isLoading } = useSelector(state => state.tutorial);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getAll());
    return () => dispatch(reset());
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }

  return (
    <>
      {user ?
        (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  name='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Tutorials List</h4>

              <ul className="list-group">
                {tutorials.length === 0 ?
                  <p>Add more tutorials</p>
                  :
                  tutorials
                    .filter(tutorial => {
                      if (!title) {
                        return true;
                      }
                      const searchStr = title.trim().toLowerCase();
                      return tutorial.title.toLowerCase().includes(searchStr);
                    })
                    .map((tutorial) => (
                      <li
                        className={
                          "list-group-item " + (tutorial._id === currentTutorial._id ? "active" : "")
                        }
                        key={tutorial._id}
                        onClick={() => setCurrentTutorial(tutorial)}
                      >
                        {tutorial.title}
                      </li>
                    ))}
              </ul>

              <button
                className="m-3 btn btn-sm btn-danger"
              >
                Remove All
              </button>
            </div>
            <div className="col-md-6">
              {currentTutorial ? (
                <div>
                  <h4>Tutorial</h4>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentTutorial.title}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentTutorial.description}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>

                  <Link
                    to={"/tutorial/" + currentTutorial._id}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Tutorial...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Please login to see or add more Tutorials</div>
        )}
    </>
  )
}

export default TutorialList;