			  const loginForm= document.getElementById('user');
			  const usernameInput = document.getElementById('username');
			  const passwordInput = document.getElementById('password');
			  const emailInput = document.getElementById('email');
			  const responseDiv = document.getElementById('response');
		  
			  loginForm.addEventListener('submit', async (event) => {
				event.preventDefault();
		  
				const username = usernameInput.value;
				const password = passwordInput.value;
				const email = emailInput.value;
		  
				try {
				const response = await fetch('http://localhost:3000/Register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password,email }),
				});
				if (!response.ok) {
				throw new Error('HTTP error! status: ${ response.status }');
				}
				const data = await response.json();
				responseDiv.textContent=data.message;
                if (data.message === 'Registration successful') {
                    window.location.href = 'amazon.html';
                }
				} catch (error) {
				  console.error('Fetch Error:', error);
				  responseDiv.textContent = error.message;
				}
			  });
