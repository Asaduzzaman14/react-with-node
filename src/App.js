
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handelFormSubmit = (event) => {


    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }



    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      })

  }

  return (
    <div className="App">
      <h1>total users : {users.length}</h1>

      <form onSubmit={handelFormSubmit}>
        <input type="text" name='name' placeholder='name' />
        <input type="email" name='email' placeholder='email' />
        <input type="submit" value='add user' />
      </form>


      {
        users.map(use => <li key={use.id}>{use.id} {use.name} {use.email}</li>)
      }
    </div>
  );
}

export default App;
