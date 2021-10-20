//Add Or Edit Forms
import { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { GroceryContext, TokenContext, UserContext } from "./context";

import Aos from "aos";
import "aos/dist/aos.css";

export default function GroceryForm({ form }) {
  return <>{form === "Add Grocery" ? <AddGrocery /> : <EditGrocery />}</>;
}

const AddGrocery = () => {
  const [token] = useContext(TokenContext);
  const [user] = useContext(UserContext);
  const [, setAllGroceries] = useContext(GroceryContext);
  const [grocery, setGrocery] = useState({
    user_id: "",
    name: "",
    image: "",
    notes: "",
    completed: false,
  });

  const handleSubmit = (e) => {
    fetch("http://localhost:8080/api/groceries", {
      method: "POST",
      body: JSON.stringify(grocery),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `JWT ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAllGroceries((prev) => [...prev, data]));

    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>Add Grocery</h3>
        <br />
        <input
          className="input"
          type="text"
          placeholder="Name*"
          value={grocery.name}
          name="name"
          onChange={(e) => {
            setGrocery((prev) => ({ ...prev, name: e.target.value }));
            setGrocery((prev) => ({ ...prev, user_id: user._id }));
          }}
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Image Url"
          value={grocery.image}
          name="image"
          onChange={(e) =>
            setGrocery((prev) => ({ ...prev, image: e.target.value }))
          }
        />
        <br />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Notes"
          value={grocery.notes}
          name="notes"
          onChange={(e) =>
            setGrocery((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
        <br />
        <input
          style={{ width: 75, marginTop: 20, cursor: "pointer" }}
          className="btn"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

const EditGrocery = () => {
  const [token] = useContext(TokenContext);
  const [redirect, setRedirect] = useState(false);
  let { groceryID } = useParams();
  const [grocery, setGrocery] = useState({
    user_id: "",
    name: "",
    image: "",
    notes: "",
    completed: false,
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/groceries/${groceryID}`)
      .then((res) => res.json())
      .then((data) => setGrocery(data));
  }, [groceryID]);

  const handleSubmit = (e) => {
    fetch(`http://localhost:8080/api/groceries/${groceryID}`, {
      method: "PUT",
      body: JSON.stringify(grocery),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `JWT ${token}`,
      },
    }).then(() => setRedirect(true));
    e.preventDefault();
  };

  if (redirect) return <Redirect to={"/groceries"} />;

  return (
    <div data-aos="fade-right">
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>Edit Grocery</h3>
        <br />
        <input
          className="input"
          type="text"
          placeholder="Name*"
          value={grocery.name}
          name="name"
          onChange={(e) => {
            setGrocery((prev) => ({ ...prev, name: e.target.value }));
          }}
          required
        />
        <br />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Image Url"
          value={grocery.image}
          name="image"
          onChange={(e) =>
            setGrocery((prev) => ({ ...prev, image: e.target.value }))
          }
        />
        <br />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Notes"
          value={grocery.notes}
          name="notes"
          onChange={(e) =>
            setGrocery((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
        <br />
        <input
          style={{ width: 100, marginTop: 20, cursor: "pointer" }}
          className="btn"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};
