import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: [],
      sortedField: null,
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
    return this.state.users.map(user => { // TODO: fix 'two children with the same key'
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

  sortData() {
    return (
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => this.setState({ sortedField: 'id'})}>
              id
            </button>
          </th>
          <th>
            <button type="button" onClick={() => this.setState({ sortedField: 'firstName'})}>
            First Name
            </button>
          </th>
          <th>
            <button type="button" onClick={() => this.setState({ sortedField: 'lastName'})}>
            Last Name
            </button>
          </th>
        </tr>
      </thead>
    )    
  }


  render() {
    const { users } = this.state;

    return (
      <table>
        <caption>Users data</caption>
        {this.sortData()}
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
