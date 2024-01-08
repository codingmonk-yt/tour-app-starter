import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { MAPBOX_API } from '../config';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const LocationSearch = () => {
  const [inputText, setInputText] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedInput = useDebounce(inputText, 500); // Adjust debounce delay as needed (e.g., 500ms)

  const fetchLocations = async (text) => {
    // Use your Mapbox API here to fetch locations based on input text
    // Replace 'YOUR_ACCESS_TOKEN' with your actual Mapbox access token
    const accessToken = MAPBOX_API;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${accessToken}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      // Extract location names from the API response
      const locations = data.features.map((feature) => feature.place_name);
      setOptions(locations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedInput.length >= 2) {
      fetchLocations(debouncedInput);
    }
  }, [debouncedInput]);

  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={options}
      loading={loading}
      onInputChange={(event, newValue) => {
        setInputText(newValue);
      }}
      renderInput={(params) => (
        <TextField
        placeholder='Enter Location'
          {...params}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default LocationSearch;
