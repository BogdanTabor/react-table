import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      users: null,
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
          users: result,
        })
      })
  }

  render() {
    return (
      <div>
        <p>Check the 'console'</p>
        <p>{this.users}</p>
      </div>
    )
  }
}

// https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json

export default App;
