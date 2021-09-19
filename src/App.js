import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: [`s`],
      title: `HELOO`,
      list: ['a', 'b'],
    };
  }

  componentDidMount() {
    const apiUrl = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
    this.setState({isLoading: true});

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then((result) => {
        this.setState({
          isLoading: false,
          users: ['result'],
          list: ['c', 'd'],
        })
      })
  }

  render() {
    const { title } = this.state;
    const listItems = this.state.list.map((item) => 
      <li>{item}</li>
    )
    const listUsers = this.state.users.map((user) => 
      <li>{user}</li>
    )
    return (
      <div>
        <p>Check the 'console'</p>
        <p>
          {title}
        </p>
        <ul>{listItems}</ul>
        <ul>{listUsers}</ul>
      </div>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
