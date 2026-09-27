import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard.jsx'
import TextField from '../components/auth/TextField.jsx'
import SocialLogins from '../components/auth/SocialLogins.jsx'
import SubmitButton from '../components/auth/SubmitButton.jsx'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to the auth API; for now go straight to the user dashboard
    navigate('/dashboard')
  }

  return (
    <div className="px-4 pt-12 pb-16 sm:px-6 lg:pt-[84px] lg:pb-[207px]">
      <AuthCard title="Start working with proxies" subtitle="Log in below">
        <form onSubmit={handleSubmit}>
          <TextField
            id="login-email"
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-[50px]"
          />
          <TextField
            id="login-password"
            label="Password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-[16px]"
          />

          <SocialLogins />

          <SubmitButton>Log in</SubmitButton>
        </form>
      </AuthCard>
    </div>
  )
}

export default Login
