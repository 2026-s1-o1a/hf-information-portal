import styles from './Register.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import type { User } from '../App'
import axios from 'axios'

type Props = {
  setUser: Dispatch<SetStateAction<User | null>>
}

type Role = 'patient' | 'clinician' | 'doctor' | 'pharmacy' | 'custodian'

function Register({ setUser }: Props) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [requestedRole, setRequestedRole] = useState<Role>('patient')

  const [ahpraNumber, setAhpraNumber] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [pharmacyName, setPharmacyName] = useState('')
  const [pharmacyAddress, setPharmacyAddress] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')

  const handleRegister = async () => {
    try {
      // Validate information
      if (!email || !firstName || !lastName || !password || !confirmPassword) {
        alert('Please fill in all required fields')
        return
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match')
        return
      }

      let verificationData = {}

      if (
        requestedRole === 'doctor' ||
        requestedRole === 'clinician' ||
        requestedRole === 'custodian'
      ) {
        if (!ahpraNumber || !organisation || !workEmail || !phoneNumber) {
          alert('Please complete verification details')
          return
        }

        verificationData = {
          ahpraNumber,
          organisation,
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

      // Send request to back end
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        {
          email,
          firstName,
          lastName,
          password,
          requestedRole,
          verificationData,
        },
        {
          withCredentials: true,
        }
      )

      // Alert user if successfully created account
      if (response.data.success) {
        setUser(response.data.user)

        alert(
          requestedRole === 'patient'
            ? 'Account created successfully'
            : 'Verification request submitted to admin'
        )

        navigate('/')
      }
    } catch (error) {
      console.error(error)
      alert('Registration failed')
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <button className={styles.underlinedBtn} onClick={() => navigate('/')}>
          ⏎Back to portal
        </button>
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

              <option value="custodian">Content Custodian</option>
            </select>
          </div>

          {(requestedRole === 'doctor' ||
            requestedRole === 'clinician' ||
            requestedRole === 'custodian') && (
            <>
              <div className={styles.formGroup}>
                <label>{requestedRole === 'custodian' ? 'Employee ID' : 'AHPRA Number'}</label>

                <input
                  placeholder={
                    requestedRole === 'custodian' ? 'Enter employee ID' : 'Enter AHPRA number'
                  }
                  type="text"
                  value={ahpraNumber}
                  onChange={e => setAhpraNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation Name</label>

                <input
                  placeholder="Enter organisation name"
                  type="text"
                  value={organisation}
                  onChange={e => setOrganisation(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation Email</label>

                <input
                  placeholder="Enter organisation email"
                  type="email"
                  value={workEmail}
                  onChange={e => setWorkEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation Phone Number</label>

                <input
                  placeholder="Enter organisation phone number"
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
                  placeholder="Enter pharmacy name"
                  type="text"
                  value={pharmacyName}
                  onChange={e => setPharmacyName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Pharmacy Address</label>

                <input
                  placeholder="Enter pharmacy address"
                  type="text"
                  value={pharmacyAddress}
                  onChange={e => setPharmacyAddress(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>License Number</label>

                <input
                  placeholder="Enter license number"
                  type="text"
                  value={licenseNumber}
                  onChange={e => setLicenseNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation Phone Number</label>

                <input
                  placeholder="Enter organisation phone number"
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

          <div className={styles.redirect}>
            <p>Already have an account?</p>
            <button className={styles.underlinedBtn} onClick={() => navigate('/login')}>
              Return to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
