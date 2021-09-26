import React from "react";
import "./index.css";

// TODO: ✓ change setState to work synchronously;
//       ✓ create two separate func: 1)sort data; 2)request sort;
//       - make sortData work with complicated object (adress.state)
//       - ? use components like didUpdate ?

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      sortKey: null,
      sortDirection: 'ascending',
    };
  }

  componentDidMount() {
    const apiUrl = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
    this.setState({isLoading: true});

    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {        
        this.setState({
          isLoading: false,
          data: result,
        })
      })
  }

  renderTableData() {
    console.log(`Data: Key (${this.state.sortKey})`);
    console.log(`Data: Direction (${this.state.sortDirection})`);

    let newdata = this.state.data;
    return newdata.map((user, index) => {
      const { id, firstName, lastName, email, phone, adress } = user
      return (
        <tr key={index}>
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
    console.log(`Header: Key (${this.state.sortKey})`);
    console.log(`Header: Direction (${this.state.sortDirection})`);

    return (
      <tr>
        <th onClick={() => this.requestSort('id')}>id</th>
        <th onClick={() => this.onSort('firstName')}>First Name</th>
        <th onClick={() => this.requestSort('lastName')}>Last Name</th>
        <th onClick={() => this.requestSort('email')}>Email</th>
        <th onClick={() => this.requestSort('phone')}>Phone</th>
        <th onClick={() => this.requestSort('adress.state')}>State</th>
      </tr>
    )
  }

  //Sortable Table: https://www.smashingmagazine.com/2020/03/sortable-tables-react/

  requestSort(key) { //set sortKey and change sortDirection
    const sortDirection = this.state.sortDirection;
    if (sortDirection === 'ascending') {
      this.setState({
        sortKey: key,
      }, () => {
        console.log( `requestSort1: Key (${this.state.sortKey})`);
        console.log( `requestSort1: Direction (${this.state.sortDirection})`);
        this.sortData();
        });
      this.setState({
        sortDirection: 'descending',
      })
    } else {
      this.setState({
        sortKey: key,
      }, () => {
        console.log( `requestSort2: Key (${this.state.sortKey})`);
        console.log( `requestSort2: Direction (${this.state.sortDirection})`);
        this.sortData();
        });
      this.setState({
        sortDirection: 'ascending',
      })
    }
  }

  sortData() { //get sortKey and sort data
    const sortedData = this.state.data;
    let key = this.state.sortKey;
    let direction = this.state.sortDirection;

    console.log(`sortData: Key (${this.state.sortKey})`);
    console.log(`sortData: Direction (${this.state.sortDirection})`);

    if (direction === 'descending') {
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        return 0;
      })
    } else {
      sortedData.sort((a, b) => {
        if (a[key] > b[key]) {
          return direction === 'descending' ? 1 : -1;
        }
        if (a[key] < b[key]) {
          return direction === 'descending' ? -1 : 1;
        }
        return 0;
      })
    }
    this.setState({
      sortDirection: direction,
      data: sortedData,
    })
  }

  //DO NOT WORK WITH 'id' and 'adress.state'
  onSort(key) {
    const data = this.state.data;
    data.sort((a, b) => a[key].localeCompare(b[key]))
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

export default App;
