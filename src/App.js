/*

TODO:
  ✓ render table data when page first loaded;
  ✓ ascending-descending sorting data by table header;
    ✓ make setState work synchronously;
    - add sorting marker;
    - sortData must work with nested object (adress.state);
      - https://www.freecodecamp.org/news/iterate-through-nested-object-in-react-js/;
  - global filtering with text field;
    - ? use ReactTable ?
  - additional info by clicking on a row;
  - filter by state using Select-a;

  LOCAL ISSUES
  - refactor useHooks;

  ADITIONAL FUNCTIONALITY
  - client pagination: 20 items page by page;
  
  REQUIREMENTS
  - independently implemented functionality;

*/

import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      filteredData: [],
      sortKey: null,
      isAscending: true,
      searchInput: '',
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

  //LOOK https://stackoverflow.com/questions/44402937/how-to-make-columns-in-table-sortable-in-both-ways-using-reactjs?noredirect=1&lq=1
  requestSort(key) { //set sortKey and change isAscending
    const isAscending = this.state.isAscending;
    if (isAscending) {
      this.setState({
        sortKey: key,
        isAscending: false,
      }, () => {
        this.sortData()
      });
    } else {
      this.setState({
        sortKey: key,
        isAscending: true,
      }, () => {
        this.sortData()
      });
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

  handleSearchInput = event => {
  this.setState({ searchInput: event.target.value }, () => {
    this.globalSearch();
  });
  };

//LOOK: https://stackoverflow.com/questions/56833671/implementing-a-global-search-filter-across-react-table-react-react-table/56833892
  
  globalSearch = () => {
    let { searchInput, data } = this.state;
    let filteredData = data.filter(value => {
      return (
        value.firstName.toLowerCase().includes(searchInput.toLowerCase())
      )
    })
    this.setState({ filteredData })
  }
   
  render() {
    let { data, searchInput } = this.state;
    return (
      <div>
        <br />
        <input 
          value={searchInput || ''}
          onChange={this.handleSearchInput}
          label="Search"
        />
        <br />
        <br />

        <table>
          <thead>
            {this.renderTableHeader()}
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>     
      </div>
    )
  }
}

export default App;
