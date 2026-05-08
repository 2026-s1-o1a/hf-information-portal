import styles from './Register.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import type { User } from '../App'

type Props = {
  setUser: Dispatch<SetStateAction<User | null>>
}

type Role = 'patient' | 'clinician' | 'doctor' | 'pharmacy'

function Register({ setUser }: Props) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [requestedRole, setRequestedRole] = useState<Role>('patient')

  const [ahpraNumber, setAhpraNumber] = useState('')
  const [workplace, setWorkplace] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [pharmacyName, setPharmacyName] = useState('')
  const [pharmacyAddress, setPharmacyAddress] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')

  const handleRegister = () => {
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      alert('Please fill in all required fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.find(u => u.email === email)) {
      alert('User already exists')
      return
    }

    let verificationData = {}

    if (requestedRole === 'doctor' || requestedRole === 'clinician') {
      if (!ahpraNumber || !workplace || !workEmail || !phoneNumber) {
        alert('Please complete verification details')
        return
      }

      verificationData = {
        ahpraNumber,
        workplace,
        workEmail,
        phoneNumber,
      }
    }

    if (requestedRole === 'pharmacy') {
      if (!pharmacyName || !pharmacyAddress || !licenseNumber || !phoneNumber) {
        alert('Please complete pharmacy verification details')
        return
      }

      verificationData = {
        pharmacyName,
        pharmacyAddress,
        licenseNumber,
        phoneNumber,
      }
    }

    const newUser: User = {
      email,
      firstName,
      lastName,
      password,

      role: 'patient',

      requestedRole,

      verificationStatus: requestedRole === 'patient' ? 'none' : 'pending',

      verificationData,
    }

    const updatedUsers = [...users, newUser]

    localStorage.setItem('users', JSON.stringify(updatedUsers))

    localStorage.setItem('currentUser', JSON.stringify(newUser))

    setUser(newUser)

    alert(
      requestedRole === 'patient'
        ? 'Account created successfully'
        : 'Verification request submitted to admin'
    )

    navigate('/')
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2>REGISTER</h2>

        <div className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label>Email</label>

            <input
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>First Name</label>

            <input
              placeholder="Enter your first name"
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>

            <input
              placeholder="Enter your last name"
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>

            <input
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>

            <input
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Requested Role (Non-patient roles require admin approval)</label>

            <select value={requestedRole} onChange={e => setRequestedRole(e.target.value as Role)}>
              <option value="patient">Patient</option>
              <option value="clinician">Clinician</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacy">Pharmacy</option>
            </select>
          </div>

          {(requestedRole === 'doctor' || requestedRole === 'clinician') && (
            <>
              <div className={styles.formGroup}>
                <label>AHPRA Number</label>

                <input
                  placeholder="Enter AHPRA number"
                  type="text"
                  value={ahpraNumber}
                  onChange={e => setAhpraNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation</label>

                <input
                  placeholder="Enter your organisation"
                  type="text"
                  value={workplace}
                  onChange={e => setWorkplace(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation Email</label>

                <input
                  placeholder="Enter your organisation email"
                  type="email"
                  value={workEmail}
                  onChange={e => setWorkEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation Phone Number</label>

                <input
                  placeholder="Enter your organisation phone number"
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}

          {requestedRole === 'pharmacy' && (
            <>
              <div className={styles.formGroup}>
                <label>Pharmacy Name</label>

                <input
                  type="text"
                  value={pharmacyName}
                  onChange={e => setPharmacyName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Pharmacy Address</label>

                <input
                  type="text"
                  value={pharmacyAddress}
                  onChange={e => setPharmacyAddress(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>License Number</label>

                <input
                  type="text"
                  value={licenseNumber}
                  onChange={e => setLicenseNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}

          <button className={styles.registerBtn} onClick={handleRegister}>
            Create Account
          </button>
          <p>Already have an account?</p>
          <button className={styles.registerBtn} onClick={() => navigate('/login')}>
            Return to login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
