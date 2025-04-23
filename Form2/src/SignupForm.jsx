import { useFormik } from 'formik';
import * as Yup from 'yup';
import './SignupForm.css'

const SignupForm = () => {
  
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="error">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <div className="form-group checkbox">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.acceptTerms}
        />
        <label htmlFor="acceptTerms">I accept the terms and conditions</label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
          <div className="error">{formik.errors.acceptTerms}</div>
        ) : null}
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default SignupForm;