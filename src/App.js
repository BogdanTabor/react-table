import './App.css';
import React from "react";

// import React, { Component } from 'react'

// class Table extends Component {
//    constructor(props) {
//       super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
//       this.state = { //state is by default an object
//          students: [
//             { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
//             { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
//             { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
//             { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
//          ]
//       }
//    }

//    renderTableData() {
//     return this.state.students.map((student, index) => {
//        const { id, name, age, email } = student //destructuring
//        return (
//           <tr key={id}>
//              <td>{id}</td>
//              <td>{name}</td>
//              <td>{age}</td>
//              <td>{email}</td>
//           </tr>
//        )
//     })
//  }

//  renderTableHeader() {
//   let header = Object.keys(this.state.students[0])
//   return header.map((key, index) => {
//      return <th key={index}>{key.toUpperCase()}</th>
//   })
// }

//  render() {
//     return (
//        <div>
//           <h1 id='title'>React Dynamic Table</h1>
//           <table id='students'>
//              <tbody>
//                 <tr>{this.renderTableHeader()}</tr>
//                 {this.renderTableData()}
//              </tbody>
//           </table>
//        </div>
//     )
//  }
// }

class Data extends React.Component {
  componentDidMount() {
    const apiUrl = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}

export default Data;
// export default Table;
