import './bootstrap.ts';
import app from 'rest/app';

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
