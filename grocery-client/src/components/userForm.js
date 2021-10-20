import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { TokenContext, UserContext } from "./context";

export default function UserForm({ form }) {
  return <>{form === "Sign Up" ? <SignUpForm /> : <LoginForm />}</>;
}

const SignUpForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (e) => {
    if (userInput.password === confirm) {
      fetch("http://localhost:8080/api/signup", {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((err) => console.log(err));

      setRedirect(true);
    } else {
      setErrorMsg(true);
    }
    e.preventDefault();
  };

  if (redirect) return <Redirect to={"/login"} />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>Sign Up</h3>
        <br />
        <input
          className="input"
          type="email"
          placeholder="Email*"
          value={userInput.email}
          name="email"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="text"
          placeholder="First Name*"
          value={userInput.first_name}
          name="first_name"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, first_name: e.target.value }))
          }
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Last Name*"
          value={userInput.last_name}
          name="last_name"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, last_name: e.target.value }))
          }
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="password"
          placeholder="Password*"
          value={userInput.password}
          name="password"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="password"
          placeholder="Confirm Password*"
          value={confirm}
          name="confirm"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <br />
        {errorMsg ? (
          <div className="error">Incorrect Email/Password</div>
        ) : (
          <div></div>
        )}
        <input
          style={{ width: 100, marginTop: 20, cursor: "pointer" }}
          className="btn"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

const LoginForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [, setToken] = useContext(TokenContext);
  const [, setUser] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify(userInput),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrorMsg(true);
        } else {
          localStorage.setItem("User", JSON.stringify(data.user));
          localStorage.setItem("Token", JSON.stringify(data.token));
          setToken(`JWT ${data.token}`);
          setUser(data.user);
          setRedirect(true);
        }
      });
    e.preventDefault();
  };

  if (redirect) return <Redirect to={"/groceries"} />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <br />
        <input
          className="input"
          type="email"
          placeholder="Email*"
          value={userInput.email}
          name="email"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="password"
          placeholder="Password*"
          value={userInput.password}
          name="password"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <br />
        {errorMsg ? (
          <div className="error">Invalid Email/Password</div>
        ) : (
          <div></div>
        )}
        <input
          style={{ width: 100, marginTop: 20, cursor: "pointer" }}
          className="btn"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};
