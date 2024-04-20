const loginForm = document.getElementById('user');
 const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Basic client-side validation (you can add more checks)
  if (username === '' || password === '') {
    errorMessage.textContent = 'Please fill in all fields.';
    return;
  }

  // Send the username and password to the backend for validation (using AJAX or Fetch API)
  // This example simulates a successful login
  // Replace with your actual backend interaction

  setTimeout(() => {
    errorMessage.textContent = '';
    alert('Login Successful!'); // Simulate success message
    // Redirect to the main page or handle successful login
  }, 1000); // Simulate delay (remove for faster experience)
});
