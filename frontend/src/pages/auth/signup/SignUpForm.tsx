import { useState } from "react";;
import { useNavigate } from 'react-router';
import axios from 'axios';
import styles from '../auth.module.css'

interface SignUpFormProps {
  loadUserProfile: () => void;
}

type Role = 'patient' | 'clinician' | 'doctor' | 'pharmacy' | 'custodian'

function SignupForm({ loadUserProfile }: SignUpFormProps) {

  // Form to submit to the backend
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    requestedRole: 'patient'
  });

  // Data for specific clincian roles
  const [clinicianData, setClinicianData] = useState({
    ahpraNumber: '',
    organisationName: '',
    organisationAddress: '',
    workEmail: '',
    phoneNumber: ''
  })

  const navigate = useNavigate();

  //  Handles submit, ensuring all data is validated before submitting
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevent default form submission

    // Validate signup data
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields')
      return
    }

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // Validate clincian data
    if (
      formData.requestedRole === 'doctor' ||
      formData.requestedRole === 'clinician' ||
      formData.requestedRole === 'custodian'
    ) {
      if (!clinicianData.ahpraNumber || !clinicianData.organisationName || !clinicianData.workEmail || !clinicianData.phoneNumber || !clinicianData.organisationAddress) {
        alert('Please complete verification details')
        return
      }
    }

    try {

      // Get JWT Cookie and Sign up
      const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
        withCredentials: true,  // Allow cookies (JWT) to be sent and received
      });

      // If sign up is successful navigate to home
      if (response.data.success) {
        console.log('Sign-up successful');
        await loadUserProfile()
        navigate('/');
      } else {
        alert('Sign-up failed');
      }

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {

        // Backend error message
        alert(error.response?.data.message || 'Error submitting form');

      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,  // previous data form data
      [name]: value, // Update the specific field based on name
    }));
  };

  const handleClincianChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClinicianData((prevData) => ({
      ...prevData,  // previous data form data
      [name]: value, // Update the specific field based on name
    }));
  };

  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.registerCard}>
          <div className={styles.registerForm}>

            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>

              <div className={styles.formGroup}>
                <label>Email</label>

                <input
                  placeholder="example@gmail.com"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>First Name</label>

                <input
                  placeholder="Enter your first name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Last Name</label>

                <input
                  placeholder="Enter your last name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>

                <input
                  placeholder="Enter password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Confirm Password</label>

                <input
                  placeholder="Confirm password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Requested Role (Non-patient roles require verification from admin)</label>

                <select name="requestedRole" value={formData.requestedRole} onChange={handleChange}>
                  <option value="patient">Patient</option>

                  <option value="clinician">Clinician</option>

                  <option value="doctor">Doctor</option>

                  <option value="custodian">Content Custodian</option>
                </select>
              </div>

              {(formData.requestedRole === 'doctor' ||
                formData.requestedRole === 'clinician' ||
                formData.requestedRole === 'custodian') && (
                  <>
                    <div className={styles.formGroup}>
                      <label>{formData.requestedRole === 'custodian' ? 'Employee ID' : 'AHPRA Number'}</label>

                      <input
                        placeholder={
                          formData.requestedRole === 'custodian' ? 'Enter employee ID' : 'Enter AHPRA number'
                        }
                        name="ahpraNumber"
                        type="text"
                        value={clinicianData.ahpraNumber}
                        onChange={handleClincianChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Organisation Name</label>

                      <input
                        placeholder="Enter organisation name"
                        name="organisation"
                        type="text"
                        value={clinicianData.organisationName}
                        onChange={handleClincianChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Organisation Address</label>

                      <input
                        placeholder="Enter organisation address"
                        name="organisationAddress"
                        type="text"
                        value={clinicianData.organisationAddress}
                        onChange={handleClincianChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Organisation Email</label>

                      <input
                        placeholder="Enter organisation email"
                        name="workEmail"
                        type="email"
                        value={clinicianData.workEmail}
                        onChange={handleClincianChange}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Organisation Phone Number</label>

                      <input
                        placeholder="Enter organisation phone number"
                        name="phoneNumber"
                        type="text"
                        value={clinicianData.phoneNumber}
                        onChange={handleClincianChange}
                      />
                    </div>
                  </>
                )}

              <input className={styles.signupBtn} type="submit" value="Create Account" />

            </form>

            <p>Already have an account?</p>
            <button className={styles.signupBtn} onClick={() => navigate('/signin')}>
              Return to Login
            </button>
            
          </div>


        </div>
      </div>


    </>
  );
};

export default SignupForm;