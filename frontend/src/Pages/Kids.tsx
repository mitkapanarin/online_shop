import React, { Component } from "react";
import ProductCard from "../components/Cards/ProductCard";

const url = "http://localhost:8000";
const endpoint = "/graphql";
const query =
  "{ categories { id name __typename } products { id name instock gallery description brand __typename } }";

export class Kids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    fetch(url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ isError: true, isLoading: false });
      });
  }

  render() {
    const { data, isLoading, isError } = this.state;
    console.log("data", data?.data?.products);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error fetching data</div>;
    }

    return (
      <div className="my-8">
        <h1 className="text-center font-semibold text-3xl my-4">
          Kids Clothing
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {data?.data?.products?.map((product) => (
            <ProductCard name={product?.name} image={product?.gallery[0]} />
          ))}
        </div>
      </div>
    );
  }
}

export default Kids;
