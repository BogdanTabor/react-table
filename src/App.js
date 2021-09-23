import React from "react";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [],
      sort: {
        column: null,
        direction: 'desc',
      },
    };
    this.onSort = this.onSort.bind(this)
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
    return ( //TODO: reading 'state' - Cannot read properties of undefined (reading 'localeCompare');
            //     : reading 'id' - a[sortKey].localeCompare is not a function;
      <tr>
        <th onClick={e => this.onSort(e, 'id')}>id</th>
        <th onClick={e => this.onSort(e, 'firstName')}>First Name</th>
        <th onClick={e => this.onSort(e, 'lastName')}>Last Name</th>
        <th onClick={e => this.onSort(e, 'email')}>Email</th>
        <th onClick={e => this.onSort(e, 'phone')}>Phone</th>
        <th onClick={e => this.onSort(e, 'adress.state')}>State</th>
      </tr>
    )
  }

  onSort(event, sortKey) {
    const data = this.state.data;
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }

    //the function does not work properly
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
