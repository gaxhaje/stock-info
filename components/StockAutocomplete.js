// components/StockAutocomplete.js

// SWR is a React Hooks library for remote data fetching.
import fetch from 'isomorphic-unfetch';
import { useState, useEffect, useMemo, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from 'throttle-debounce';
import Link from 'next/link';

const PostLink = props => (
  <Link href="/stock/[id]" as={`/stock/${props.option.symbol}`}>
    <a>{props.option.symbol} | {props.option.security_name}</a>
  </Link>
);

export default function StockAutocomplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const loading = open && inputValue.length !== 0;

  // API request
  const fetchData = useMemo(
    () =>
      debounce(1000, (input, callback) => {
        const { input: q } = input;
        return fetch(`/api/symbol_autocomplete?q=${q}`)
          .then(r => r.json())
          .then(data =>  callback(data));
      }),
    [],
  );

  // handle input change
  const handleChange = event => setInputValue(event.target.value);

  // handle selected input
  const handleSelected = event => console.log(event.target.value);

  useEffect(() => {
    let active = true;

    if (!loading && inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetchData({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetchData]);

  return (
    <Autocomplete
      id="stock-search"
      style={{ 
        width: '100%',
        textTransform: 'uppercase',
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={option => `${option.symbol} | ${option.security_name}`}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Find a Symbol"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {/*loading ? <CircularProgress color="inherit" size={20} /> : null*/}
                {loading ? '' : null}
              </Fragment>
            ),
          }}
        />
      )}
      renderOption={(option, { inputValue }) => {
        return (
          <PostLink option={option} />
        );
      }}
    />
  );
}
