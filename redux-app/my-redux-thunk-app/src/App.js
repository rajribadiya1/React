import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions/exampleActions';

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.example);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      <h1>Redux Thunk Example</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;