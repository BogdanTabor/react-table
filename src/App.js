import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: '',
      title: `HELOO`,
      list: ['a', 'b'],
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
          users: result.users,
          list: ['c', 'd'],
        })
        console.log(this.state.users);
      })
  }

  render() {
    const { title, users } = this.state;
    const listItems = this.state.list.map((item) => 
      <li>{item}</li>
    )

    return (
      <div>
        <p>Check the 'console'</p>
        <p>{title}</p>
        <ul>{listItems}</ul>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>
              {user.id}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
