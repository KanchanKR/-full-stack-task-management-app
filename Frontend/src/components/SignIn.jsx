/* eslint-disable react/prop-types */
import { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { UserSignIn } from "../api";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
           // Store the JWT token in localStorage after sign up
        localStorage.setItem("krist-app-token", res.data.token);
        
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          setLoading(false);
          setButtonDisabled(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        });
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-9">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Welcome to Krist 👋</h1>
        <p className="text-base font-normal text-text_secondary/90">Please login with your details here</p>
      </div>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <span className="text-end text-text_primary cursor-pointer text-sm font-medium transition-all duration-300 hover:text-primary">
          Forgot Password?
        </span>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </div>
  );
};

export default SignIn;
