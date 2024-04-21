const express = require('express');
const oracledb = require('oracledb');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


app.post('/Register', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "system",
            password: "oracle123",
            connectString: "localhost:1521/ORCLPDB"
        });

        const { username, password,email } = req.body;

 // Check if the item is already in the cart
 const { rows } = await connection.execute(
  `select * from users where uname = :uname or email=:email`,
  { uname: username ,email: email }
);

  if (rows.length > 0) {
    res.json({ message: 'User already exists' });
  } else {
    await connection.execute(
      `insert into users(email,uname,password) values(:email, :uname, :password)`,
      {
        uname: username,
        password: password,
        email:email
      }  // bind parameter
    );
    res.json({ message: 'Registration successful'});
  }
    
    await connection.commit();

   
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});




app.post('/Login', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "system",
            password: "oracle123",
            connectString: "localhost:1521/ORCLPDB"
        });

        const { username, password} = req.body;

 // Check if the item is already in the cart
 const { rows } = await connection.execute(
  `select * from users where uname = :uname and password=:password`,
  { uname: username,password:password}
);

  if (rows.length > 0) {
    res.json({ message: 'Login Successful' });
  } else {
    res.json({ message: 'Invalid username or password'});
  }
    
    await connection.commit();

   
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});






app.listen(3000, () => console.log('Server started on port 3000'));