import "./App.css";
import { useForm } from "react-hook-form";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import {
  FormProvider,
  FTextField,
  FCheckbox,
  FMultiCheckbox,
  FSelect,
  FSwitch,
  FRadioGroup,
} from "./components/form";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

function App() {
  const defaultValues = {
    username: "",
    email: "",
    password: "123binh",
    gender: [],
    remember: true,
    isGoing: false,
    country: "",
    codingLanguage: [],
  };
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => {
    console.log("data", data);
    // setError("afterSubmit", { message: "Server response error" });
  };
  return (
    <div className="App">
      <Typography variant="h4" textAlign="center" mb={3}>
        React Hook Form
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <FTextField name="username" label="Username" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    arial-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {" "}
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FMultiCheckbox name="gender" options={["Male", "Female"]} />
          <FRadioGroup
            name="code"
            options={["Javascript", "ReactJS", "ExpressJS"]}
          />
          <FSelect name="country" label="Country">
            {[
              { code: "VN", label: "Vietnam" },
              { code: "UK", label: "United Kingdom" },
            ].map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FSwitch name="switch" label="On going" />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justify-content="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="remember me" />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </div>
  );
}

export default App;
