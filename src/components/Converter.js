import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Line } from "react-chartjs-2";
import ShowChartIcon from "@material-ui/icons/ShowChart";

export default function Converter() {
  const [exchangeValues, setExchangeValues] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [shownExchangeValue, setShownExchangeValue] = useState(1);
  const [showChart, setShowChart] = useState(false);
  const [chartDataSet, setChartDataSet] = useState({});
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
  const loadChart = () => {
    setChartDataSet({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "USD",
          data: [43, 34, 76, 55, 66, 54],
          backgroundColor: "rgba(255, 23, 68,0.2)",
          borderColor: "rgba(255, 23, 68,1)",
        },
        {
          label: "EUR",
          data: [12, 54, 33, 54, 46, 65],
          backgroundColor: "rgba(213, 0, 249,0.2)",
          borderColor: "rgba(213, 0, 249,1)",
        },
        {
          label: "GBP",
          data: [32, 53, 74, 41, 44, 65],
          backgroundColor: "rgba(61, 90, 254,0.2)",
          borderColor: "rgba(61, 90, 254,1)",
        },
      ],

      height: "400px",
    });
  };

  const handleChange = (event) => {
    let currency = event.target.value;
    setCurrency(currency);
    console.log(currency);
    console.log(exchangeValues[currency]);
    console.log(chartData.EUR);
    console.log(Object.keys(chartData.EUR));
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
      Axios.get(
        "https://free.currconv.com/api/v7/convert?q=EUR_SEK&compact=ultra&date=2021-05-17&endDate=2021-05-25&apiKey=dedc3fcbb37cec30f6ea"
      ),
      Axios.get(
        "https://free.currconv.com/api/v7/convert?q=USD_SEK&compact=ultra&date=2021-05-17&endDate=2021-05-25&apiKey=dedc3fcbb37cec30f6ea"
      ),
      Axios.get(
        "https://free.currconv.com/api/v7/convert?q=GBP_SEK&compact=ultra&date=2021-05-17&endDate=2021-05-25&apiKey=dedc3fcbb37cec30f6ea"
      ),
    ])
      .then(
        Axios.spread(
          (
            responseEUR,
            responseUSD,
            responseGBP,
            chartEUR,
            chartUSD,
            chartGBP
          ) => {
            setExchangeValues({
              EUR: responseEUR.data.EUR_SEK,
              USD: responseUSD.data.USD_SEK,
              GBP: responseGBP.data.GBP_SEK,
            });
            setChartData({
              EUR: chartEUR.data.EUR_SEK,
              USD: chartUSD.data.USD_SEK,
              GBP: chartGBP.data.GBP_SEK,
            });
          }
        )
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
          <Container maxWidth="md">
            <div align="center" style={{ marginTop: "100px" }}>
              <form
                noValidate
                autoComplete="off"
                style={{
                  padding: "60px 0px",
                  border: "1px solid grey",
                  borderRadius: "20px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                }}
              >
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
          <Container maxWidth="md" style={{ marginTop: "50px" }}>
            {showChart ? (
              <div>
                <Button
                  onClick={() => setShowChart(false)}
                  variant="contained"
                  color="default"
                  startIcon={<ShowChartIcon />}
                >
                  Hide Chart
                </Button>
                <Line data={chartDataSet} />
              </div>
            ) : (
              <Button
                onClick={() => {
                  setShowChart(true);
                  loadChart();
                }}
                variant="contained"
                color="default"
                startIcon={<ShowChartIcon />}
              >
                Show Chart
              </Button>
            )}
          </Container>
        </div>
      </main>
    </>
  );
}
