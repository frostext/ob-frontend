import React, { useState } from 'react'
import { forgotPassword } from '../../apis/Api'
import { toast } from 'react-toastify'

const SendPasswordReset = () => {
    const [email, setEmail] = useState("")

    const handleSubmit= (e) => {
        e.preventDefault()
        forgotPassword({email}).then(res => {
            toast.success("Check your email for password reset link")
        }).catch(err => {
            console.log(err)
            toast.error('Something went wrong')
        })
    }
    return (
        <div className='d-flex align-items-center'>
            
            <form action="">
            <h1>Send Password Reset</h1>
                <label htmlFor="email">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                />
                <button className='btn btn-outline-black w-100 mt-2' onClick={handleSubmit}>
                    Send Password Reset
                </button>
            </form>
        </div>
    )
}

export default SendPasswordReset