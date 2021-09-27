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
      isAscending: true,
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
    return (
      <tr>
        <th onClick={() => this.requestSort('id')}>id</th>
        <th onClick={() => this.requestSort('firstName')}>First Name</th>
        <th onClick={() => this.requestSort('lastName')}>Last Name</th>
        <th onClick={() => this.requestSort('email')}>Email</th>
        <th onClick={() => this.requestSort('phone')}>Phone</th>
        <th onClick={() => this.requestSort('adress.state')}>State</th>
      </tr>
    )
  }

  requestSort(key) { //set sortKey and change isAscending
    const isAscending = this.state.isAscending;
    if (isAscending) {
      this.setState({ sortKey: key }, () => { this.sortData() });
      this.setState({ isAscending: false })
    } else {
      this.setState({ sortKey: key }, () => { this.sortData() });
      this.setState({
        isAscending: true,
      })
    }
  }

  sortData() { //get sortKey and sort data
    const sortedData = this.state.data;
    let key = this.state.sortKey;
    let direction = this.state.isAscending;

    if (direction) {
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === true ? 1 : -1;
        }
        if (a[key] > b[key]) {
          return direction === true ? -1 : 1;
        }
        return 0;
      })
    } else {
      sortedData.sort((a, b) => {
        if (a[key] > b[key]) {
          return direction === false ? 1 : -1;
        }
        if (a[key] < b[key]) {
          return direction === false ? -1 : 1;
        }
        return 0;
      })
    }
    this.setState({
      isAscending: direction,
      data: sortedData,
    })
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
