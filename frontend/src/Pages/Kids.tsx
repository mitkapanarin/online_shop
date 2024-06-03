import { Component } from "react";

const url = "http://localhost:8000";
const endpoint = "/graphql";
const query =
  "{ categories { id name __typename } products { id name instock gallery description brand __typename } }";

export class Kids extends Component {
  componentDidMount() {
    fetch(url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "cors",
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    return <div>Kids clothing</div>;
  }
}

export default Kids;
