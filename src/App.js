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
        <th onClick={() => this.onSort('firstName')}>First Name</th>
        <th onClick={() => this.requestSort('lastName')}>Last Name</th>
        <th onClick={() => this.requestSort('email')}>Email</th>
        <th onClick={() => this.requestSort('phone')}>Phone</th>
        <th onClick={() => this.requestSort('adress.state')}>State</th>
      </tr>
    )
  }

  //testing Sortable Table
  //https://www.smashingmagazine.com/2020/03/sortable-tables-react/

  //<<______________
  //TODO:
  //    ? - make sortableTable function able to work with sortDirection
  //        (it have to sort data using direction and then change it to opposite)
  // 
  //    1 - how to set state in correct way ?
  //    2 - create two separate func: 1) sort data; 2)request sort;
  //    3 - refactor class to functional component

  sortableTable() { //get sortKey and sortData
    const sortedData = this.state.data;
    let sortKey = this.state.sortKey;
    let sortDirection = this.state.sortDirection;

    if (sortKey && sortDirection !== null) {
      sortedData.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return sortDirection === 'ascending' ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return sortDirection === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    this.setState({sortDirection: sortDirection}) // change it to correct way
    this.setState({data: sortedData}) // change it to correct way
  }

  requestSort(key) { //set sortKey and change sortDirection
    const sortKey = this.state.sortKey;
    const sortDirection = this.state.sortDirection;
    let direction = 'ascending';

    if (sortKey === key && sortDirection === 'ascending') {
      direction = 'descending';
    }
    this.setState({sortDirection: direction}) // change it to correct way
    this.setState({sortKey: key}) // change it to correct way

    console.log( `requestSort 1: this.key: ${ this.state.sortKey }` );
    console.log( `requestSort 1: this.direct: ${ this.state.sortDirection }` );
  }
  //____________________________________>>

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

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
