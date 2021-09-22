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
      })
  }

  renderTableData() {
    let newUsers = this.state.users;
    return newUsers.map(user => { // TODO: fix 'two children with the same key'
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

  renderTableHeader() {
    return (
      <tr>
        <th onClick={this.onSort('id')}>
          id
          <span className={this.setArrow('id')}></span>
        </th>
        <th onClick={this.onSort('firstName')}>
          First Name
          <span className={this.setArrow('firstName')}></span>
        </th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>State</th>
      </tr>
    )
  }

  onSort(event, sortKey){

    const data = this.state.data;
    data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
      
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
    return className;
  };
    
  render() {
    return (
      <table>
        <caption>Users data</caption>
        <thead>
          {this.renderTableHeader()}
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
