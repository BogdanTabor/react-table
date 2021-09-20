import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: [],
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
          users: result,
        })
        console.log(this.state.users);
      })
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <p>List of users</p>
        <ul>
          {users.map(user => (
            <li key={user.id}> {/* TODO: fix "children with the same key" */}
              {user.firstName}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
