import './App.css';
import { useState } from 'react';

// 1. create a form with 3 input fields, for the username, password and confirm password respectively
// 2. persist the state of the input fields entries
// 3. the password and confirm password input field should valid there entries by comparing both values
// 4. output to the user when both field match or dont match
// 5. bonus would be to style the form

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className='App mt-10'>
      <h1 className='text-3xl font-bold mb-4'>TST Mini Tech Challenge</h1>
      <h3 className='text-xl font-bold mb-4'>Create an account</h3>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input
          name='username'
          type='text'
          value={formData.username}
          placeholder='Username'
          className='mb-4 p-2 border border-gray-300 rounded'
          onChange={handleChange}
        />
        <input
          name='password'
          type='password'
          value={formData.password}
          placeholder='Password'
          className='mb-4 p-2 border border-gray-300 rounded'
          onChange={handleChange}
        />
        <input
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          placeholder='Confirm Password'
          className='mb-4 p-2 border border-gray-300 rounded'
          onChange={handleChange}
        />
        {formData.password.length > 0 && formData.confirmPassword.length > 0 ? (
          formData.password === formData.confirmPassword ? (
            <p>all good!</p>
          ) : (
            <p>passwords dont match</p>
          )
        ) : null}
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
