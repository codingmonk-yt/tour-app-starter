/* eslint-disable react/prop-types */
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { Divider } from "@mui/material";

const GuestsSelector = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 1,
    infants: 1,
    pets: 1,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleGuestsChange = (type, value) => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + value), // Ensure the minimum value is 0
    }));
  };

  const displayGuests = `${guests.adults} Adults, ${guests.children} Children, ${guests.infants} Infants & ${guests.pets} Pet`;

  return (
    <>
      <TextField
        fullWidth
        value={displayGuests}
        placeholder="Enter Guest Details"
        variant={props.type}
        onClick={handleClick}
        InputProps={{
          disableUnderline: true,
          readOnly: true, // Makes the input field read-only
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack spacing={2} sx={{ px: 4, py: 2 }}>
          {/* <Typography variant="subtitle2">Guests</Typography> */}
          {/* Adults */}
          <Stack spacing={2}>
            <Stack
              sx={{ width: 300 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Adults
                </Typography>
                <Typography variant="caption">Ages 13 or above</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("adults", -1)}
                  disabled={guests.adults === 0}
                >
                  <MinusCircle />
                </IconButton>
                <TextField
                  value={guests.adults}
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  style={{ width: "40px", textAlign: "center" }}
                  disabled
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("adults", 1)}
                >
                  <PlusCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
          </Stack>
          {/* Children */}
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Children
                </Typography>
                <Typography variant="caption">Ages 2-12</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("children", -1)}
                  disabled={guests.children === 0}
                >
                  <MinusCircle />
                </IconButton>
                <TextField
                  value={guests.children}
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  style={{ width: "40px", textAlign: "center" }}
                  disabled
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("children", 1)}
                >
                  <PlusCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
          </Stack>
          {/* Infants */}
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Infants
                </Typography>
                <Typography variant="caption">Under 2</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("infants", -1)}
                  disabled={guests.infants === 0}
                >
                  <MinusCircle />
                </IconButton>
                <TextField
                  value={guests.infants}
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  style={{ width: "40px", textAlign: "center" }}
                  disabled
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("infants", 1)}
                >
                  <PlusCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
          </Stack>
          {/* Pets */}
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                Pets
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("pets", -1)}
                  disabled={guests.pets === 0}
                >
                  <MinusCircle />
                </IconButton>
                <TextField
                  value={guests.pets}
                  type="number"
                  InputProps={{ disableUnderline: true }}
                  style={{ width: "40px", textAlign: "center" }}
                  disabled
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("pets", 1)}
                >
                  <PlusCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
          </Stack>
          {/* Display Total Guests */}
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {displayGuests}
          </Typography>
        </Stack>
      </Popover>
    </>
  );
};

export default GuestsSelector;
