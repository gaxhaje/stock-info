// pages/symbol/[id].js

import fetch from 'isomorphic-unfetch';
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import StockAutocomplete from '../../components/StockAutocomplete';
import { useRouter } from 'next/router';
import { Chart } from "react-google-charts";
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { iex_token } from '../../token';

export default function Graph({ data }) {
  return (
    <Layout>
      <Header />
      <Container maxWidth="lg">
        <main className="center">
          <StockAutocomplete />
          <div className="stock-graph">
            {!data.length 
              ? <CircularProgress color="inherit" size={40} /> 
              : <Chart
                  chartType="CandlestickChart"
                  loader={<div>Loading Chart</div>}
                  data={data}
                  options={{
                  legend: 'none',
                  bar: { groupWidth: '90%' }, // Remove space between bars.
                  candlestick: {
                    fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                    risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
                  },
                }}
                rootProps={{ 'data-testid': '2' }}
                />
            }
          </div>
        </main>
        <style jsx>{`
          main {
            width: 90%;
            margin: 50px auto;
          }
          .stock-graph {
            margin: 100px auto;
            text-align: center;
            font-family: cursive;
            color: #e243de;
          }
        `}</style>
      </Container>
    </Layout>
  );
}

Graph.getInitialProps = async ctx => {
  const symbol = ctx.query.id;
  const token = iex_token;
  const API = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${token}`;
  let data = [];
  try {
    const res = await fetch(API);
    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  let chartData = [['Date', 'Low', 'Open', 'Close', 'High']];

  // const mapped = data.map(x => [
  data.forEach(x => {
    const date  = x.date.split('-');
    chartData.push([
    `${date[1]}/${date[2]}`,
    x.low,
    x.open,
    x.close,
    x.high
  ]);

  });

  return { data: chartData};
}
