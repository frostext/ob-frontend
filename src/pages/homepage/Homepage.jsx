import React, { useEffect, useState } from "react";
import { getProducts, testApi } from "../../apis/Api";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  console.log(products);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="container mt-5">
      <form action="">
        <input type="text" id="form12" onChange={(e) => setSearchQuery(e.target.value)} class="form-control mb-3" placeholder="Search products" />
        <button onClick={handleSearch} type="submit" hidden class="btn btn-primary">Search</button>
      </form>
      <div
        id="carouselBasicExample"
        class="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
              class="d-block w-100"
              alt="Sunset Over the City"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Welcome to OnlineBazar</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
              class="d-block w-100"
              alt="Canyon at Nigh"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp"
              class="d-block w-100"
              alt="Cliff Above a Stormy Sea"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div>
        <h1 className="mt-5 mb-4">Available products</h1>
        <div class="row row-cols-1 row-cols-md-4 g-4">

          {
            products.map((product) => {
              return <Link to={`products/${product._id}`} class="col">
                <div class="card">
                  <img src={product.image} class="card-img-top object-cover" alt="Hollywood Sign on The Hill" width={'100px'} height={'220px'} />
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 class="card-title text-black">{product.name}</h5>
                      <h5 class="card-title text-black">NPR.{product.price}</h5>
                    </div>
                    <hr />
                    <p className="text-black">
                      {product.description}
                    </p>
                    <button className="btn w-100 btn-outline-black">
                      View more
                    </button>
                  </div>
                </div>
              </Link>
            })
          }

        </div>
      </div>

    </div>
  );
};

export default Homepage;




