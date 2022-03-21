import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

const FRadioGroup = ({ name, options, getOptionLabel, ...other }) => {
  const { control } = useFormContext();
  console.log("option", options);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>
          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default FRadioGroup;
