import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard.jsx'
import TextField from '../components/auth/TextField.jsx'
import SelectField from '../components/auth/SelectField.jsx'
import SocialLogins from '../components/auth/SocialLogins.jsx'
import SubmitButton from '../components/auth/SubmitButton.jsx'
import { countries } from '../data/countries.js'

const countryOptions = countries.map((c) => ({ value: c.code, label: c.name }))
const today = new Date().toISOString().split('T')[0]

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', repeatPassword: '', dob: '', country: '' })
  const [dobFocused, setDobFocused] = useState(false)
  const repeatRef = useRef(null)

  // Re-check the match whenever either password changes
  useEffect(() => {
    const mismatch = form.repeatPassword && form.repeatPassword !== form.password
    repeatRef.current?.setCustomValidity(mismatch ? 'Passwords do not match' : '')
  }, [form.password, form.repeatPassword])

  const update = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to the auth API; for now go straight to the user dashboard
    navigate('/dashboard')
  }

  return (
    <div className="px-4 pt-12 pb-16 sm:px-6 lg:pt-[84px] lg:pb-[233px]">
      <AuthCard title="Create your account" subtitle="Signup below">
        <form onSubmit={handleSubmit}>
          <TextField
            id="signup-email"
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update('email')}
            className="mt-[50px]"
          />
          <TextField
            id="signup-password"
            label="Password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            minLength={8}
            required
            value={form.password}
            onChange={update('password')}
            className="mt-[16px]"
          />
          <TextField
            id="signup-repeat-password"
            label="Repeat Password"
            type="password"
            placeholder="Repeat Password"
            autoComplete="new-password"
            required
            value={form.repeatPassword}
            onChange={update('repeatPassword')}
            ref={repeatRef}
            className="mt-[16px]"
          />
          {/* Text input until focused so the "Date of birth" placeholder shows, as in the design */}
          <TextField
            id="signup-dob"
            label="Date of birth"
            type={dobFocused || form.dob ? 'date' : 'text'}
            placeholder="Date of birth"
            autoComplete="bday"
            max={today}
            required
            value={form.dob}
            onChange={update('dob')}
            onFocus={() => setDobFocused(true)}
            onBlur={() => setDobFocused(false)}
            className="mt-[25px] [&_input]:[color-scheme:dark]"
          />
          <SelectField
            id="signup-country"
            label="Country"
            placeholder="Country"
            options={countryOptions}
            autoComplete="country"
            required
            value={form.country}
            onChange={update('country')}
            className="mt-[25px]"
          />

          <SocialLogins className="mt-[68px]" />

          <SubmitButton className="sm:mb-[28px]">Signup</SubmitButton>
        </form>
      </AuthCard>
    </div>
  )
}

export default Signup
