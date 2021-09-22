import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: [],
      sort: {
        column: null,
        direction: 'desc',
      },
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

  onSort = (column) => (e) => {
    const direction = this.state.sort.column ?
    (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
    const sortedData = this.state.data.sort((a, b) => {
      if (column === 'id') {
        const nameA = a.id.toUpperCase(); // ignore upper and lowercase
        const nameB = b.id.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else {
        return a.firstName - b.firstName;
      }
    });
      
    if (direction === 'desc') {
      sortedData.reverse();
    }
    
    this.setState({
      users: sortedData,
      sort: {
        column,
        direction,
      }
    });
  };

  setArrow = (column) => {
    let className = 'sort-direction';
    
    if (this.state.sort.column === column) {
      className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
    }
    
    console.log(className);
    
    return className;
  };
  
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={this.onSort('id')}>
              id
              <span className={this.setArrow('id')}></span>
            </th>
            <th onClick={this.onSort('firstName')}>
              First Name
              <span className={this.setArrow('firstName')}></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  
  render() {
    const { users } = this.state;

    return (
      <table>
        <caption>Users data</caption>
        {this.onSort()}
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
