const loginForm= document.getElementById('Login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const responseDiv = document.getElementById('response');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  try {
  const response = await fetch('http://localhost:3000/Login', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password}),
  });
  if (!response.ok) {
  throw new Error('HTTP error! status: ${ response.status }');
  }
  const data = await response.json();
  responseDiv.textContent=data.message;
  if (data.message === 'Login Successful') {
      window.location.href = 'amazon.html';
  }
  } catch (error) {
    console.error('Fetch Error:', error);
    responseDiv.textContent = error.message;
  }
});
