import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Container,
  Input,
  Button,
  TextField,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function Converter() {
  const [exchangeValues, setExchangeValues] = useState([]);
  const [amount, setAmount] = useState(1);
  const [shownExchangeValue, setShownExchangeValue] = useState(1);

  /* useEffect(() => {
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
          console.log(exchangeValues);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []); */

  useEffect(() => {
    setExchangeValues({
      EUR: 11,
      USD: 12,
      GBP: 13,
    });
  }, []);

  useEffect(() => {
    setShownExchangeValue(amount * exchangeValues.EUR);
  }, [amount]);

  useEffect(() => {
    if (exchangeValues !== []) {
      setShownExchangeValue(exchangeValues.EUR);
    }
  }, [exchangeValues]);

  return (
    <>
      <main>
        <div>
          <Typography variant="h3" align="center" color="textPrimary">
            Converter
          </Typography>
          <Container>
            <form>
              <TextField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <ArrowRightAltIcon style={{ fontSize: 40 }} />
              <TextField value={shownExchangeValue} />
            </form>
          </Container>
        </div>
      </main>
    </>
  );
}
