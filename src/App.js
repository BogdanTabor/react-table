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

  renderTableData() {
    return this.state.users.map(user => {
      const { id, firstName, lastName, email, phone, adress } = user
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{adress.state}</td>
        </tr>
      )
    })
  }
  
  render() {
    const { users } = this.state;

    return (
      <table>
        <caption>Users data</caption>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableData()}
        </tbody>
      </table>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
