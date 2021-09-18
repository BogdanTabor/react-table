import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  async getUsersData() {
    const res = await fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
    const data = await res.json();
    return data.results;
  }

  async componentDidMount() {
    const users = await this.getUsersData();
    this.setState({ users });
  }


  

  render() {
    const User = ({ id, firstName }) => (
      <div>
        <p>{id}</p>
        <p>{firstName}</p>
      </div>
    );
    
    return (
      <div>
        {this.state.users.map((user) => (
          <User
            id={user.id}
            firstName={user.firstName}
          />
        ))}
      </div>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
