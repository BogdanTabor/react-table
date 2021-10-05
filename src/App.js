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
  - refactor to functional component;

  ADITIONAL FUNCTIONALITY
  - client pagination: 20 items page by page;
  
  REQUIREMENTS
  - independently implemented functionality;

*/

import React, { useState, useEffect } from "react";
import "./index.css";

function App(props) {
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  // const [ filteredData, setFilteredData ] = useState([])
  const [ sortKey, setSortKey ] = useState(null)
  const [ isAscending, setIsAscending ] = useState(true)
  // const [ searchInput, setSearchInput ] = useState('')

  const loadData = async () => {
    const apiUrl = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
    setIsLoading(true)
    try {
      const response = await fetch(apiUrl)
      .then((response) => response.json())
        setData(response)
        setIsLoading(false)
    } catch(e) {
      setIsLoading(false)
    }
  }
    
  useEffect(() => { 
    loadData()
  }, [])

  const renderTableData = () => {
    let newdata = data
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

  const renderTableHeader = () => {
    return (
      <tr>
        <th onClick={() => requestSort('id')}>id</th>
        <th onClick={() => requestSort('firstName')}>First Name</th>
        <th onClick={() => requestSort('lastName')}>Last Name</th>
        <th onClick={() => requestSort('email')}>Email</th>
        <th onClick={() => requestSort('phone')}>Phone</th>
        <th onClick={() => requestSort('adress.state')}>State</th>
      </tr>
    )
  }

  //LOOK https://stackoverflow.com/questions/44402937/how-to-make-columns-in-table-sortable-in-both-ways-using-reactjs?noredirect=1&lq=1
  const requestSort = key => { //set sortKey and change isAscending
    const ascending = isAscending
    if (ascending) {
      setSortKey(key)
      setIsAscending(false)
      sortData()
    } else {
      setSortKey(key)
      setIsAscending(true)
      sortData()
    }
  }

  const sortData = () => { //get sortKey and sort data
    const sortedData = data
    let key = sortKey
    let direction = isAscending

    if (direction) {
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === true ? 1 : -1;
        }
        if (a[key] > b[key]) {
          return direction === true ? -1 : 1;
        }
        return 0
      })
    } else {
      sortedData.sort((a, b) => {
        if (a[key] > b[key]) {
          return direction === false ? 1 : -1;
        }
        if (a[key] < b[key]) {
          return direction === false ? -1 : 1;
        }
        return 0
      })
    }
    setIsAscending(direction)
    setData(sortedData)
  }

  // const handleSearchInput = event => {
  //   this.setState({ searchInput: event.target.value }, () => {
  //     globalSearch()
  //   })
  // }

//LOOK: https://stackoverflow.com/questions/56833671/implementing-a-global-search-filter-across-react-table-react-react-table/56833892
  
  // const globalSearch = () => {
  //   let { searchInput, data } = this.state
  //   let filteredData = data.filter(value => {
  //     return (
  //       value.firstName.toLowerCase().includes(searchInput.toLowerCase())
  //     )
  //   })
  //   this.setState({ filteredData })
  // }
   
  return (
    <div>
      <br />
      <input 
        // value={searchInput || ''}
        // onChange={}
        label="Search"
      />
      <br />
      <br />

      <table>
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>     
    </div>
  )
}

export default App;
