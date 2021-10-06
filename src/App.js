/*

TODO:
  ✓ render table data when page first loaded;
  ✓ ascending-descending sorting data by table header;
    ✓ make setState work synchronously;
    ✓ refactor class to functional component;
    - add sorting marker;
    - sortData must work with nested object (adress.state);
      - https://www.freecodecamp.org/news/iterate-through-nested-object-in-react-js/;
  - global filtering with text field;
    - ? use ReactTable ?
  - additional info by clicking on a row;
  - filter by state using Select-a;

  LOCAL ISSUES

  ADITIONAL FUNCTIONALITY
  - client pagination: 20 items page by page;
  
  REQUIREMENTS
  - independently implemented functionality;

*/

import React, { useState, useEffect, useMemo } from "react";
import "./index.css";

function App(props) {
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ sortKey, setSortKey ] = useState(null)
  const [ isAscending, setIsAscending ] = useState(null)
  // const [ filteredData, setFilteredData ] = useState([])
  // const [ searchInput, setSearchInput ] = useState('')
  
  useEffect(() => { 
    loadData()
  }, [])

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

  const requestSort = key => {
    let ascending = true
    if (sortKey === key && isAscending === true) {
      ascending = false
    }
    setIsAscending(ascending)
    setSortKey(key)
  }

  const sortData = useMemo(() => {
    let sortedData = data
    if (sortKey !== null && isAscending !== null) {
      sortedData.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return isAscending === true ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return isAscending === true ? 1 : -1;
        }
        return 0
      })
    }
    return sortedData
  }, [ data, sortKey, isAscending ])

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
