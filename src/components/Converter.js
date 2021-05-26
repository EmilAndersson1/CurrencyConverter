import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography, Container, MenuItem, TextField } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function Converter() {
  const [exchangeValues, setExchangeValues] = useState([]);
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [shownExchangeValue, setShownExchangeValue] = useState(1);
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
      value: "GBP",
      label: "£",
    },
  ];
  const handleChange = (event) => {
    let currency = event.target.value;
    setCurrency(currency);
    console.log(currency);
    console.log(exchangeValues[currency]);
  };
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
          setExchangeValues({
            EUR: responseEUR.data.EUR_SEK,
            USD: responseUSD.data.USD_SEK,
            GBP: responseGBP.data.GBP_SEK,
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*  useEffect(() => {
    setExchangeValues({
      EUR: 11,
      USD: 12,
      GBP: 13,
    });
  }, []); */

  useEffect(() => {
    setShownExchangeValue(amount * exchangeValues[currency]);
  }, [amount]);

  useEffect(() => {
    if (exchangeValues !== []) {
      setShownExchangeValue(exchangeValues[currency]);
      setAmount(1);
    }
  }, [exchangeValues, currency]);

  return (
    <>
      <main>
        <div>
          <Typography variant="h3" align="center" color="textPrimary">
            Converter
          </Typography>
          <Container>
            <div align="center" style={{ marginTop: "200px" }}>
              <form noValidate autoComplete="off">
                <TextField
                  select
                  value={currency}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  label={currency}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <ArrowRightAltIcon style={{ fontSize: 55 }} />
                <TextField
                  variant="outlined"
                  label="SEK"
                  value={shownExchangeValue}
                />
              </form>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
