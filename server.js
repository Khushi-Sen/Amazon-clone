const express = require('express');
const oracledb = require('oracledb');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


app.post('/addCustomer', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "system",
            password: "oracle123",
            connectString: "localhost:1521/ORCLPDB"
        });

        const result = await connection.execute(
            `insert into customer values(: name)`,
            { name: req.body.name }  // bind parameter
        );
        await connection.execute(`commit`);

        res.json({ message: 'Successfully added customer', result });
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