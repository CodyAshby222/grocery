import UserForm from "../components/userForm";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function SignUp() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="green-page">
      <div data-aos="fade-left" className="form-content">
        <div className="center">
          <img
            style={{ height: 50, width: 50, marginBottom: 15 }}
            src="/images/cupcake.png"
            alt="cupcake"
          />
          <h3 style={{ textAlign: "center" }}>Welcome!</h3>
          <h6 style={{ textAlign: "center", marginTop: 15 }}>
            If your already a user
            <br />
            please login below
          </h6>
          <div className="btn-group">
            <Link style={{ marginLeft: 10 }} className="btn" to="/login">
              Login
            </Link>
          </div>
        </div>
        <UserForm form="Sign Up" />
      </div>
    </div>
  );
}
