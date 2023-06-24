const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())


app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})









const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ah3a7qz.mongodb.net/?retryWrites=true&w=majority`;
/*const uri = "mongodb+srv://userrrrmanage:Oi9rVWNIaHjKCG57@cluster0.ah3a7qz.mongodb.net/?retryWrites=true&w=majority";*/

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   // await client.connect();
    // Send a ping to confirm a successful connection


     const usermanagercollectoin = client.db("usermanagmentbd").collection("user");


     app.post('/user', async (req, res) => {
      const adduser = req.body;
      console.log(adduser);
      const useraddresult = await usermanagercollectoin.insertOne( adduser);
      res.send(useraddresult);
    });

     app.get('/user', async (req, res) => {

      const result = await usermanagercollectoin.find().toArray();
      res.send(result)
    });

     app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await usermanagercollectoin.deleteOne(query);
      res.send(result);
    })
    app.put('/user/:id', async (req, res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id) };
    const upadate = req.body
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name:upadate.name,
        email: upadate.email,
        phone: upadate.phone
      },
    };
    const updateresult = await usermanagercollectoin.updateOne(query, updateDoc, options);
    res.send(updateresult)
  } )


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



