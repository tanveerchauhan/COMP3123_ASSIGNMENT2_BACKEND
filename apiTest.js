const axios = require('axios');

// Base URL for the backend
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test User Signup
const testSignup = async () => {
  try {
    const response = await apiClient.post('/user/signup', {
      username: 'mantejsinghsamra',
      email: 'mantejsinghsamra@example.com',
      password: 'mantej457',
    });
    console.log('Signup Response:', response.data);
  } catch (error) {
    console.error('Signup Error:', error.response?.data || error.message);
  }
};

// Test Create Employee
const testCreateEmployee = async () => {
  try {
    const response = await apiClient.post('/emp/employees', {
      first_name: 'Ramandeepkalsi',
      last_name: 'singh',
      email: 'ramandeepkalsisingh@example.com',
      position: 'Designer',
      salary: 3000,
      date_of_joining: '2023-08-12',
      department: 'Design',
    });
    console.log('Create Employee Response:', response.data);
  } catch (error) {
    console.error('Create Employee Error:', error.response?.data || error.message);
  }
};

// Run tests
(async () => {
  console.log('Testing User Signup...');
  await testSignup();

  console.log('Testing Employee Creation...');
  await testCreateEmployee();
})();
