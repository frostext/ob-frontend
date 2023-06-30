import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { loginUser } from '../../apis/Api'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // call api to login user
    loginUser({email, password}).then((res) => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(addUser(res.data.user))
      navigate('/')

    }).catch((err) => {
      console.log(err)
    })
  }

  return (
     <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <h1>Login</h1>
            <form action="">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleEmail}
                type="email" name="email" id="" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={handlePassword}
                type="password" name="password" id="" className="form-control" />
              </div>
              <button
                onClick={handleSubmit}
              className="btn btn-primary mt-2 w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login