const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u51v8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const db = client.db("sumiyaPortfolio");
    const bannerIntroCollection = db.collection("bannerIntro");
    const socialLinksCollection = db.collection("socialLinks");
    const aboutMeCollection = db.collection("aboutMe");
    const skillsCollection = db.collection("skills");
    const educationalQualificationCollection = db.collection("educationalQualification");
    const projectCollection = db.collection("project");
    const achievementCollection = db.collection("achievement");

    // get about me
    app.get("/banner-intro", async (req, res) => {
      const bannerIntro = await bannerIntroCollection.find({}).toArray();
      res.send(bannerIntro);
    });

    app.post("/banner-intro", async (req, res) => {
      const bannerIntro = req.body;
      const result = await bannerIntroCollection.insertOne(bannerIntro);
      res.send(result);
    });

    // update about me
    app.patch("/banner-intro/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { designation, description } = req.body;
        
        // Validate the incoming data
        if (!designation || !description) {
          return res.status(400).json({ error: "Designation and description are required" });
        }

        const updateDoc = {
          designation,
          description
        };

        // Only include image if it exists in the request
        if (req.body.image) {
          updateDoc.image = req.body.image;
        }

        const result = await bannerIntroCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateDoc }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Banner intro not found" });
        }

        res.json({ success: true, result });
      } catch (error) {
        console.error("Error updating banner intro:", error);
        res.status(500).json({ error: "Failed to update banner intro" });
      }
    });

    // get social links
    app.get("/social-links", async (req, res) => {
      const socialLinks = await socialLinksCollection.find({}).toArray();
      res.send(socialLinks);
    });

    // update social links
    app.patch("/social-links/:id", async (req, res) => {
      const id = req.params.id;
      const updatedSocialLinks = req.body;
      const result = await socialLinksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedSocialLinks });
      res.send(result);
    });

    // post social links
    app.post("/social-links", async (req, res) => {
      const socialLinks = req.body;
      const result = await socialLinksCollection.insertOne(socialLinks);
      res.send(result);
    });

    // get about me
    app.get("/about-me", async (req, res) => {
      const aboutMe = await aboutMeCollection.find({}).toArray();
      res.send(aboutMe);
    });

    // post about me
    app.post("/about-me", async (req, res) => {
      const aboutMe = req.body;
      const result = await aboutMeCollection.insertOne(aboutMe);
      res.send(result);
    });

    // update about me
    app.patch("/about-me/:id", async (req, res) => {
      const id = req.params.id;
      const updatedAboutMe = req.body;
      const result = await aboutMeCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedAboutMe });
      res.send(result);
    });

    // get skills
    app.get("/skills", async (req, res) => {
      const skills = await skillsCollection.find({}).toArray();
      res.send(skills);
    });

    // post skills
    app.post("/skills", async (req, res) => {
      const skills = req.body;
      const result = await skillsCollection.insertOne(skills);
      res.send(result);
    });

    // update skills
    app.patch("/skills/:id", async (req, res) => {
      const id = req.params.id;
      const updatedSkills = req.body;
      const result = await skillsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedSkills });
      res.send(result);
    });

    // get educational qualification
    app.get("/educational-qualification", async (req, res) => {
      const educationalQualification = await educationalQualificationCollection.find({}).toArray();
      res.send(educationalQualification);
    });

    // post educational qualification
    app.post("/educational-qualification", async (req, res) => {
      const educationalQualification = req.body;
      const result = await educationalQualificationCollection.insertOne(educationalQualification);
      res.send(result);
    });

    // get achievement
    app.get("/achievements", async (req, res) => {
      const achievement = await achievementCollection.find({}).toArray();
      res.send(achievement);
    }); 

    // post achievement
    app.post("/achievements", async (req, res) => {
      const achievement = req.body;
      const result = await achievementCollection.insertOne(achievement);
      res.send(result);
    });

    // update achievement
    app.patch("/achievements/:id", async (req, res) => {
      const id = req.params.id;
      const updatedAchievement = req.body;
      const result = await achievementCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedAchievement });
      res.send(result);
    });

    // get project
    app.get("/project", async (req, res) => {
      const project = await projectCollection.find({}).toArray();
      res.send(project);
    });

    // post project
    app.post("/project", async (req, res) => {
      const project = req.body;
      const result = await projectCollection.insertOne(project);
      res.send(result);
    });

    // update project
    app.patch("/project/:id", async (req, res) => {
      const id = req.params.id;
      const updatedProject = req.body;
      const result = await projectCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProject });
      res.send(result);
    });

    // get project by id
    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const project = await projectCollection.findOne({ _id: new ObjectId(id) });
      res.send(project);
    }); 

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
