import express, { urlencoded } from 'express';
import mysql2 from 'mysql2';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import yts from 'yt-search';

const app =express();

app.use(cors());

app.use(urlencoded({extended:true}));
app.get('/',(req,res)=>{
  res.send("Ready to serve...")
})
app.get('/song', async (req, res) => {
    try {
      const q = req.query.q;
      console.log(q)
      const result = await yts({ query:q });
      const video = result.videos;
      if (!video) return res.status(404).json({ error: 'No video found' });
      res.json({ videoId: video, title: video.title });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/song/find', async (req, res) => {
    try {
      const q = req.query.q;
      const result = await yts({ query:q });
      const video = result.videos[0];
      if (!video) return res.status(404).json({ error: 'No video found' });
      res.json({ videoId: video.videoId, title: video.title });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(5000,()=>{
    console.log('Server is running on port 5000 ');
})