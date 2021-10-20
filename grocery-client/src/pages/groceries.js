import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GroceryContext,
  TokenContext,
  UserContext,
} from "../components/context";
import GroceryForm from "../components/groceryForm";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Groceries() {
  const [allGroceries, setAllGroceries] = useContext(GroceryContext);
  const [user] = useContext(UserContext);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const deleteGrocery = (id, groceryName) => {
    fetch(`http://localhost:8080/api/groceries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    setAllGroceries(allGroceries.filter((grocery) => grocery._id !== id));
    toast.error(`Successfully Deleted: ${groceryName}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/groceries")
      .then((res) => res.json())
      .then((data) => setAllGroceries(data));
  }, [setAllGroceries]);

  return (
    <>
      <div className="green-section">
        <div data-aos="fade-left" className="green-content">
          <GroceryForm form="Add Grocery" />
        </div>
      </div>
      <h5 data-aos="zoom-in" style={{ textAlign: "center", marginTop: 30 }}>
        "A little cupcake goes a long way."
        <br /> -A Cupcake Lover
      </h5>
      <div className="grocery-content">
        {allGroceries && user ? (
          allGroceries.map((grocery, index) => {
            if (grocery.user_id === user._id) {
              return (
                <div
                  key={`Grocery_${index}`}
                  data-aos="fade-right"
                  className="grocery-box"
                >
                  {grocery.image ? (
                    <img
                      className="grocery-image"
                      src={grocery.image}
                      alt={`Img_${index}`}
                    />
                  ) : (
                    <img
                      className="grocery-image"
                      src="/images/cupcake.png"
                      alt={`Default_${index}`}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ marginTop: 10 }}>{grocery.name}</h3>
                    {grocery.notes ? (
                      <div style={{ margin: 10, textAlign: "center" }}>
                        <b>Notes:</b>
                        <br />
                        {grocery.notes}
                      </div>
                    ) : (
                      <h6 style={{ margin: 10, textAlign: "center" }}>
                        No Notes
                      </h6>
                    )}
                    <div
                      style={{
                        display: "flex",
                        marginTop: 10,
                        marginBottom: 20,
                        paddingLeft: 20,
                      }}
                    >
                      <Link
                        className="btn-outline"
                        to={`/groceries/${grocery._id}`}
                      >
                        Edit
                      </Link>
                      <div
                        onClick={() => deleteGrocery(grocery._id, grocery.name)}
                        className="logout-btn"
                      >
                        Done
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <div>Error</div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
      />
    </>
  );
}
