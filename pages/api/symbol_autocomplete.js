import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

export default async (req, res) => {
  // Read in CSV and parse only for demo.
  const nasdaqlisted = await csv({delimiter: ['|']}).fromFile('nasdaqlisted.txt');
  const otherlisted  = await csv({delimiter: ['|']}).fromFile('otherlisted.txt');
  const listedStocks = nasdaqlisted.concat(otherlisted)
    .map(x => {
      let symbol = x.Symbol || x['ACT Symbol'];
      return {
        symbol: symbol, 
        security_name: x['Security Name']
      };
    })
    .sort((a, b) => {
      let nameA = a.security_name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.security_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    })
    .filter(x => !x.symbol.includes('File Creation Time'));

  const { q } = req.query;
  let stocks = listedStocks;

  if (q) {
    // console.log('q', q);
    stocks = stocks.filter(stock => stock.security_name.toLowerCase().includes(q.toLowerCase()));
  }

  res.status(200).json(stocks);
};