import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  //  use selector to get user from redux store
  const {cart} = useSelector((state) => ({
    cart: state.cartReducer.cart,
  })); // Access the cart state
  

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <Link to={"/"} class="navbar-brand me-2">
            <h3 className="text-danger fw-bold">
              Online-
              <span className="text-black">Bazzar</span>
            </h3>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
            <Link to={'/cart'} className="m-4">
              <i class="fa fa-shopping-cart fa-lg"></i>
              <span class="badge rounded-pill badge-notification bg-danger">{cart.length}</span>
            </Link>

            <div class="d-flex align-items-center">
              {/* check if user is login or not */}
              {user ? (
                <div class="dropdown">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome {user.fname}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {
                      // check if user is admin or not
                      user.isAdmin ? (
                        <>
                          <li>
                          <Link class="dropdown-item" to={"/admin/dashboard"}>
                            Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to={"/admin/orders"}>
                            Admin Orders
                          </Link>
                        </li>
                        </>
                      ) : (
                        <Link class="dropdown-item" to={"/profile"}>
                          Profile
                        </Link>
                      )
                    }

                    <li>
                      <a onClick={handleLogout} class="dropdown-item">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to={"/register"}>
                  <button type="button" class="btn btn-primary px-3 me-2">
                    Register
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
