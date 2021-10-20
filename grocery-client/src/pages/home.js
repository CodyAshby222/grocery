import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="content">
        <div>
          <h1 data-aos="fade-right">Groceries Made Easy</h1>
          <h5 data-aos="fade-right" style={{ marginTop: 25 }}>
            Create and organize your grocery list.
          </h5>
          <div data-aos="fade-right" className="btn-group">
            <Link className="btn" to="/signup">
              Sign Up
            </Link>
            <Link className="btn-outline" to="/login">
              Login
            </Link>
          </div>
        </div>
        <img
          data-aos="fade-left"
          className="image"
          src="/images/groceryCircle.png"
          alt="groceries"
        />
      </div>
      <div className="green-section">
        <div data-aos="fade-left" className="green-content">
          <h2>OUR MISSION</h2>
          <img className="sm-image" src="/images/basket.png" alt="cupcake" />
          <h5>"CUPCAKES TAKE THE CAKE"</h5>
          <h6 style={{ marginTop: 20, textAlign: "center" }}>
            Our mission is quite simple. We want you to have the best grocery
            shopping experience!
          </h6>
        </div>
      </div>
      <div data-aos="fade-right" className="content">
        <div>
          <h2>
            Cupcakes are sweet.
            <br /> And even sweeter when shared.
          </h2>
          <h6 style={{ marginTop: 25 }}>
            Help you organize your list of groceries, and even add notes for
            reminders.
          </h6>
          <div className="btn-group">
            <Link className="btn" to="/signup">
              Get Started
            </Link>
          </div>
        </div>
        <img className="image-2" src="/images/grocery.png" alt="groceries" />
      </div>
      <div className="green-section">
        <div data-aos="fade-left" className="content">
          <img
            className="image-3"
            src="/images/ladyWithGroceries.png"
            alt="groceries"
          />
          <div>
            <h2>Easy As One. Two. Three!</h2>
            <h6 style={{ marginTop: 25 }}>
              Just one form away and you'll never have to stress
              <br />
              with groceries. It'll be easy as "cup"cake!
            </h6>
            <div className="btn-group">
              <Link className="btn" to="/signup">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
