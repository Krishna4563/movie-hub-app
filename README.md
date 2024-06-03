# MOVIE-HUB-APP

[Live App Link](https://movie-hub-client.vercel.app)

This is a movie hub app, which lets users to search for movies and add them to their list. The app is gated with authentication, requiring users to register and log in to access the app. Once registered, users can log in directly with their credentials on subsequent visits. User details and movies added to their lists are saved in a MongoDB database.

The movies are fetched using an external API. [Link](https://www.omdbapi.com)

The app is styled using Tailwind CSS and is completely mobile responsive.

Tech stack used for frontend - React(using Vite) and Tailwind CSS (styling framework). 
Tech stack used for Backend - Node.js and Express.js (for creating API endpoints), MongoDB (for storing user and list details) and JWT(jsonwebtoken) for user authentication.


# Install Dependencies and start the app -

Frontend - 
```bash
cd client
npm install axios
```

Backend -
```bash
cd server
npm install cors dotenv express nodemon mongoose jsonwebtoken
```

To start the frontend -
```bash
npm run dev
```


To start the server -
```bash
npm start
```
