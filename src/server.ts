import db from './config/database.config';
import app from './app';

db.sync().then(() => {
  console.log('Database is connected');
});



const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




