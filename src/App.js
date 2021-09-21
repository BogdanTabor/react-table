import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: [],
    };
  }

  componentDidMount() {
    const apiUrl = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
    this.setState({isLoading: true});

    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoading: false,
          users: result,
        })
        console.log(this.state.users);
      })
  }
  
  render() {
    const { users } = this.state;

    return (
      <div>
        <table>
      <caption>Users data</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.adress.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
        <p>List of users</p>
        <ul>
          {users.map(user => (
            <li key={user.id}> {/* TODO: fix "children with the same key" */}
              {user.firstName}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
