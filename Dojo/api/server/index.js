import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

require('dotenv').config();

const { PORT, MONGO_URI, NODE_ENV } = process.env;

////////////////////////////////////
//        MongoDB Connect         //
////////////////////////////////////
mongoose.connect(MONGO_URI);
mongoose.connection.on('open', () => console.log('DB Connected'));
mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));


////////////////////////////////////
//        App Init                //
////////////////////////////////////
const app = express();
app.use(cookieParser());
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '20mb' }));
//app.use(cors);



////////////////////////////////////
//         App Routes             //
////////////////////////////////////
import account from './api/account.js';
import event from './api/event';

app.use('/api/account', account);
app.use('/api/event', event);

////////////////////////////////////
//        App React Template      //
////////////////////////////////////
app.get('*', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>  
      <head>
      
      </head>
      <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>`

  res.send(html);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}, mode: ${NODE_ENV}`));