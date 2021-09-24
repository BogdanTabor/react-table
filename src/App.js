import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
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
        <th onClick={() => this.onSort('lastName')}>Last Name</th>
        <th onClick={() => this.onSort('email')}>Email</th>
        <th onClick={() => this.onSort('phone')}>Phone</th>
        <th onClick={() => this.sortableTable('adress.state')}>State</th>
      </tr>
    )
  }

  //DO NOT WORK ON 'id' and 'adress.state'
  onSort(sortKey) {
    const data = this.state.data;
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }

  //testing Sortable Table
  //https://www.smashingmagazine.com/2020/03/sortable-tables-react/
  sortableTable(sortedField) {
    this.setState({sortedField})
    let sortedData = this.state.data;
      if (sortedField !== null) {
        sortedData.sort((a, b) => {
          if (a[sortedField] < b[sortedField]) {
            return -1;
          }
          if (a[sortedField] > b[sortedField]) {
            return 1;
          }
          return 0;
      });
    }
  }

  //the function does not work properly
    //FIX: reading 'state' - Cannot read properties of undefined (reading 'localeCompare');
    //FIX: reading 'id' - a[sortKey].localeCompare is not a function;

  // onSort = (column) => (e) => {
  //   const direction = this.state.sort.column ? 
  //     (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
  //   const sortedData = this.state.data.sort((a, b) => {
  //       if (column) {
  //         if (a < b) {
  //           return -1;
  //         }
  //         if (a > b) {
  //           return 1;
  //         }
  //         return 0;
  //       }
  //   });

  //   if (direction === 'desc') {
  //     sortedData.reverse();
  //   }

  //   this.setState({
  //     data: sortedData,
  //     sort: {
  //       column,
  //       direction,
  //     }
  //   });
  // };

   
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
