import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Typography, Container, Input, Button } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function Converter() {
  let exchangeValues = {};
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
  useEffect(() => {
    Axios.all([
      Axios.get(
        "https://free.currconv.com/api/v7/convert?q=EUR_SEK&compact=ultra&apiKey=dedc3fcbb37cec30f6ea"
      ),
      Axios.get(
        "https://free.currconv.com/api/v7/convert?q=USD_SEK&compact=ultra&apiKey=dedc3fcbb37cec30f6ea"
      ),
      Axios.get(
        "https://free.currconv.com/api/v7/convert?q=GBP_SEK&compact=ultra&apiKey=dedc3fcbb37cec30f6ea"
      ),
    ])
      .then(
        Axios.spread((responseEUR, responseUSD, responseGBP) => {
          exchangeValues = {
            EUR: responseEUR.data.EUR_SEK,
            USD: responseUSD.data.USD_SEK,
            GBP: responseGBP.data.GBP_SEK,
          };
          console.log(exchangeValues);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <main>
        <div>
          <Typography variant="h3" align="center" color="textPrimary">
            Converter
          </Typography>
          <Container>
            <form>
              <Input placeholder={exchangeValues.EUR} />
              <ArrowRightAltIcon style={{ fontSize: 40 }} />
              <Input placeholder="1" />
            </form>
          </Container>
        </div>
      </main>
    </>
  );
}
