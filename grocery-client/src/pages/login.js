import UserForm from "../components/userForm";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="green-page">
      <div data-aos="fade-right" className="form-content">
        <img
          style={{ height: 400 }}
          src="/images/ladyWithGroceries.png"
          alt="Lady W/ Groceries"
        />
        <div>
          <UserForm />
          <h5
            style={{
              width: 370,
              textAlign: "center",
              marginTop: 20,
              marginBottom: 30,
            }}
          >
            When stressed and in doubt,
            <br /> Cupcake it out!
          </h5>
        </div>
      </div>
    </div>
  );
}
