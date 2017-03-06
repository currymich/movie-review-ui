# Movie Review App
## App Title: Cinematiques


## Overview
Cinematiques is a web app built on a Rails back-end with an Angular front-end. It's purpose is to allow a user to login to the website, search for a movie, and write a review for that movie. Users will have the ability to see other user posted reviews on the app index page, while also managing their own reviews from their user page.

The app makes use of the OMDB API to search and select movies. Once the movie has been searched, the user has the option to write their own review and preview it before they submit. Additionally, the user can also see other user posted reviews for that movie on the same movie search page.

Once a user writes a review for a particular movie, it is sent to our back-end framework which checks to see if the movie is already stored in our database. If the movie is found in the database, the stored instance of the movie is returned to the front-end. If the movie is not present, then our back-end saves a new instance of that movie. This is to ensure that there are no multiples of the same movie within our database.

Below you will find the planning process for Cinematiques.

## User Stories
As a user I want to:
- See a listing of user created reviews when I first visit Cinematiques
- Sign up for an account if I don't have one
- Fill out a form upon sign up that asks for my:
  - Name
  - Username
  - Email
  - Password
- Receive a prompt to sign up for an account before I write a review, so I can access them later
- Login to my account to view my unique user show page
- Have the option to edit my account details
- Search for movies by title or category
- View details about the movie I search:
  - Movie Title
  - Year Released
  - Movie Genre
  - Movie Rating
  - IMDBScore
  - Metacritic Score
  - Plot
- Have the option to select the movie I'm looking for if I don't initially find what I'm looking for
- Have the search movie and write a review components appear when I need them to
- Write a review for a movie that includes:
  - A Title
  - A Review Value
  - My Review Comments
- View my created reviews on my user page
- Edit my created reviews from my user page
- Delete my reviews from my user page
- Have a clear depiction of links on the page so I know what parts of the website I can visit
- (Reach Goal) Select movies as favorites and view them on my user page

## Wireframes
Home Page:
![Home Page](/public/images/home.jpg)

Movie-Review Show:
![Movie-Review Page](/public/images/movie.jpg)

User Version 1 Show:
![User Show Version 1](/public/images/user-v1.jpg)

User Version 2 Show:
![User Show Version 2](/public/images/user-v2.jpg)

## Models
User - Standard user account features
Movies - Searching and displaying movie data (API)
Reviews - Full CRUD

## Active Record Associations
Users
- has_many :reviews
- has_many :movies, through: :reviews

Movies
- has_many :reviews, dependent: :destroy
- has_many :users, through: :reviews

Reviews
- belongs_to: user
- belongs_to: movie

## ERDs
### Entities
Users
- Name
- Username
- Email
- Password

Movies
- Title
- Poster
- Genre
- Rated
- Metascore
- imdbRating
- imdbID
- Plot
- Year

Reviews
- Title
- Rating
- Comments
- User_id
- Movie_id

### SQl Tables
Users:
  - t.string   "name"
  - t.string   "username"
  - t.string   "email"
  - t.string   "password_digest"

Movies:
  - t.string   "Title"
  - t.string   "Poster"
  - t.string   "Genre"
  - t.string   "Rated"
  - t.string   "Metascore"
  - t.string   "imdbRating"
  - t.string   "imdbID"
  - t.string   "Plot"
  - t.string   "Year"

Reviews
  - t.string   "title"
  - t.integer  "rating"
  - t.string   "comments"
  - t.integer  "user_id"
  - t.integer  "movie_id"

## Technologies Used
### API
OMDB: http://www.omdbapi.com/

### Front-End
- HTML5
- CSS3
- Angular.js
- Express.js

### Back-End
- Ruby on Rails
- PostgreSQL

## MVP Goals
- Create 3 models: Users, Movies, Reviews
- User Routes: Signup, Login, Account View, Account Edit, Review List
- Movie Routes: Search Movies, Save Movies
- Review Routes: Index, Show, Create, Update, Destroy
- Add Authentication for Users
- Website Design (CSS)

## Reach Goals
- If a user is deleted, change their review to have an 'anonymous' tag
- Implement TV shows
- Allow a user to favorite movies
- Add Categories to Movies
- Validation for Forms
- Admin Panel to Create Movies
- Add CSS/Angular Animations
- Add Flash Messages
- Login via username or email
- Rating for Movies

## Project Challenges
Our main challenge came as we set up our reviews routes. Based on our active record associations for our reviews, we knew that we needed to find a way to allow both users and movies to access a particular review. Setting up the association was easy enough through Rails migrations in the back-end, however creating our resource routes took a bit of thought. This is due to the fact that movies needed to access a review without a user being signed in, and a user needed to access their review without having to go through the movies resources.

Our solution to this was to include the imdbID that was sent back from the OMDB API. This id is unique, and allowed us to pull up all reviews connected to that particular movie regardless of whether a user is signed in. This also allowed flexibility for the user side as we were then able to pull reviews connected with that user id. As a result, we ended up with three custom routes to meet our app needs:

```
get 'movies/:imdbID/reviews', to: 'reviews#reviewsByMovie'
post 'movies/:id/reviews', to: 'reviews#newReview'
get 'users/:id/reviews', to: 'reviews#reviewsByUser'
```

## Conclusion
Overall, we are happy with our work on Cinematiques. As a team, my partner and I were able to work well independently and peer programmed when necessary. Understanding how to utilize the OMDB API to meet our needs was one of our larger victories, especially when we were able to save unique instances of incoming movies to our database. Moving forward, we hope to add a favorite movie feature which will allow users to have a list of movies on their user page as well.
