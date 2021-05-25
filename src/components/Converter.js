import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Typography, Container, Input, Button } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function Converter() {
  const [currencyTo, setCurrencyTo] = useState();
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "SEK",
      label: "SEK",
    },
  ];

  const apiCall = () => {
    Axios.get(
      "https://free.currconv.com/api/v7/convert?q=SEK_USD&compact=ultra&apiKey=dedc3fcbb37cec30f6ea"
    )
      .then((response) => {
        let rate = response.data.SEK_USD;
        setCurrencyTo(rate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main>
        <div>
          <Container>
            <Typography variant="h3" align="center" color="textPrimary">
              Converter
            </Typography>
            <form>
              <Input placeholder="1" />
              <ArrowRightAltIcon style={{ fontSize: 40 }} />
              <Input placeholder="1" />
              <Button
                variant="outlined"
                onClick={() => {
                  apiCall();
                }}
              >
                Convert!
              </Button>
            </form>
          </Container>
        </div>
      </main>
    </>
  );
}
