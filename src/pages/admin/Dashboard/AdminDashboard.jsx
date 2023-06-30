import React, { useEffect, useState } from "react";
import { addProduct, deleteProduct, getCounts, getProducts } from "../../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  //  state to store count of products, orders, users
  const [productCount, setProductCount] = useState(0);
  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // for image preview
  const [previewImage, setPreviewImage] = useState("");

  // products array
  const [products, setProducts] = useState([]);


  // handle submit
  const handleSubmit = () => {
    // form object for data and image
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    // calling the function
    addProduct(formData).then((res) => {
      toast.success(res.data.message);
    }
    ).catch((err) => {
      toast.error("Something went wrong");
    })
  }



  // for image setting and preview
  const handleImageUpload = (event) => {
    setProductImage(event.target.files[0]);

    // // Read the image file using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };


  useEffect(() => {
    // call api to get all products when page load
    getProducts().then((res) => {
      console.log(res.data);
      setProducts(res.data);
    }).catch((err) => {
      console.log(err);
    })

    // call api to get count of products
    getCounts().then((res) => {
      console.log(res.data);
      setProductCount(res.data.productCount);
      setDeliveredOrdersCount(res.data.deliveredOrderCount);
      setPendingOrdersCount(res.data.pendingOrderCount);
      setUsersCount(res.data.userCount);
    })

    
  }, [])


  // handle delete product
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      deleteProduct(id)
        .then((res) => {
          toast.success("Product deleted successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  };

  return (
    <div className="container mt-3">

      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col">
          <div class="card text-white bg-danger mb-3">
            <div class="card-header">Total products</div>
            <div class="card-body">
              <h1>{productCount}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card text-white bg-warning mb-3">
            <div class="card-header">Total pending Orders</div>
            <div class="card-body">
              <h1>{pendingOrdersCount}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Total delivered orders</div>
            <div class="card-body">
              <h1>{deliveredOrdersCount}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Total users</div>
            <div class="card-body">
              <h1>{usersCount}</h1>
            </div>
          </div>
        </div>

      </div>
      <div className="d-flex justify-content-between">
        <h3>Showing all products</h3>

        <button
          type="button"
          class="btn btn-danger"
          data-mdb-toggle="modal"
          data-mdb-target="#exampleModal"
        >
          Add Product
        </button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add product
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">
                      Product Name
                    </label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      type="text"
                      class="form-control"
                      id="formFile"
                      placeholder="Enter Product Name"
                    />

                    <label for="formFile" class="form-label mt-2">
                      Product Price
                    </label>
                    <input
                      onChange={(e) => setProductPrice(e.target.value)}
                      type="text"
                      class="form-control"
                      id="formFile"
                      placeholder="Enter Product Price"
                    />
                    <label for="formFile" class="form-label mt-2">
                      Product Category
                    </label>
                    <input
                      onChange={(e) => setProductCategory(e.target.value)}
                      type="text"
                      class="form-control"
                      id="formFile"
                      placeholder="Enter Product Category"
                    />
                    <label for="formFile" class="form-label mt-2">
                      Product Description
                    </label>
                    <textarea
                      onChange={(e) => setProductDescription(e.target.value)}
                      class="form-control"
                      id="textAreaExample"
                      rows="4"
                    ></textarea>

                    <label for="formFile" class="form-label mt-2">
                      Product Image
                    </label>
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      class="form-control"
                      id="formFile"
                      placeholder="Enter Product Image"
                    />

                    {
                      previewImage && <img src={previewImage} alt="" className="mt-2 object-cover rounded-3" height={200} width={'100%'} />
                    }
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-mdb-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table  mt-2">
        <thead class="table-info">
          <tr>
            <th>Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product Category</th>
            <th scope="col">Product Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => (
              <tr>
                <td>
                  <img
                    src={product.image}
                    className="img-fluid"
                    alt=""
                    height={30}
                    width={30}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <Link to={`/admin/edit/${product._id}`} type="button" class="btn btn-success">
                      Edit
                    </Link>
                    <button type="button" class="btn btn-danger" onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
