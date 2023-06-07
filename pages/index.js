// pages/index.js

require('dotenv').config();

console.log(process.env.FIREBASE_API_KEY);
console.log(process.env.FIREBASE_AUTH_DOMAIN);
console.log(process.env.FIREBASE_PROJECT_ID);
console.log(process.env.FIREBASE_STORAGE_BUCKET);
console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log(process.env.FIREBASE_APP_ID);
console.log(process.env.FIREBASE_MEASUREMENT_ID);

// IndexPage component
const IndexPage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      {/* Add your homepage content here */}
    </div>
  );
};

export default IndexPage;
