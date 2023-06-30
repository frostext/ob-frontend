import React, { useState } from "react";
import { json } from "react-router-dom";
import { updateProfile } from "../../apis/Api";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // use state for value in input
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [email, setEmail] = useState(user.email);
  const [profileImage, setProfileImage] = useState("");

  // for image preview
  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    // form object for data and image
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("profileImage", profileImage);

    // calling the function
    updateProfile(formData).then((res) => {
      toast.success("Profile Updated Successfully");
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  }




  return (
    <>
      <div className="container text-center mt-2 align-items-center">
        <div>
          <img
            src="https://picsum.photos/200"
            className="img-fluid rounded-circle"
            alt=""
          />
        </div>

        <h3 className="mt-2">Welcome, {user.fname}</h3>

        <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
          Edit <i class="fas fa-edit"></i>
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <label for="formFile" class="form-label">First Name</label>
                  <input type="text" onChange={
                    (e) => setFname(e.target.value)
                  } value={fname} class="form-control" id="formFile" placeholder="Enter First Name" />

                  <label for="formFile" class="form-label mt-2">Last Name</label>
                  <input type="text" onChange={
                    (e) => setLname(e.target.value)
                  } value={lname} class="form-control" id="formFile" placeholder="Enter Last Name" />

                  <label for="formFile" class="form-label mt-2">Email</label>
                  <input type="text" onChange={
                    (e) => setEmail(e.target.value)
                  } value={email} class="form-control" id="formFile" placeholder="Enter Email" />

                  <label for="formFile" class="form-label mt-2">Profile Picture</label>
                  <input class="form-control" onChange={handleImageUpload} type="file" id="formFile" />
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <h4>Name : {user.fname} {user.lname}</h4>
        <h4>Email : {user.email}</h4>
      </div>
    </>
  );
};

export default ProfilePage;
