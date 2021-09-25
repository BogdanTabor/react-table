import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      sortKey: null,
      sortDirection: null,
      sortConfig: {
        key: null,
        direction: null,
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
          data: result,
        })
      })
  }

  renderTableData() {
    let newdata = this.state.data;
    return newdata.map(user => { // TODO: fix 'two children with the same key'
      const { id, firstName, lastName, email, phone, adress } = user
      return (
        <tr>
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
        <th onClick={() => this.sortableTable('id')}>id</th>
        <th onClick={() => this.sortableTable('firstName')}>First Name</th>
        <th onClick={() => this.requestSort('lastName')}>Last Name</th>
        <th onClick={() => this.onSort('email')}>Email</th>
        <th onClick={() => this.onSort('phone')}>Phone</th>
        <th onClick={() => this.sortableTable('adress.state')}>State</th>
      </tr>
    )
  }

  //testing Sortable Table
  //https://www.smashingmagazine.com/2020/03/sortable-tables-react/

  //<<______________
  sortableTable(key) {
    this.setState({sortKey: key})

    const sortedData = this.state.data;
    const sortKey = this.state.sortKey;
    let sortDirection = this.state.sortDirection;

    sortedData.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === 'ascending' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    this.setState({sortDirection: sortDirection})
  }

  requestSort(key) {
    this.setState({sortKey: key})

    const sortedData = this.state.data;
    const sortKey = this.state.sortKey;
    let sortDirection = this.state.sortDirection;

    sortDirection = 'ascending';    
    if (sortKey === key && sortDirection === 'ascending') {
      sortDirection = 'descending';
    }
    this.setState({ sortKey, sortDirection });
  }
  //____________________________________>>

  //DO NOT WORK ON 'id' and 'adress.state'
  onSort(sortKey) {
    const data = this.state.data;
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }
   
  render() {
    return (
      <table>
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
