# Movie Review App

## API
http://www.omdbapi.com/ ideal
https://www.themoviedb.org/documentation/api backup
- requires logo and message attribution
Note: Actual API used depends on HTTParty testing

## User Stories
As a user I want to:
- Sign up for an account if I don't have one
- Login to my account to view my unique user show page
- Have the option to edit my account details
- Search for movies by title or category
- Write a review for a movie that includes: a title, review value, and comments
- See my review after I've created it on my user page
- See my review posted on the movie show page
- Edit my review after I've created it from my user page
- Delete my review

## Models
User - Standard user account features
Movies - Searching and displaying movie data (API)
Reviews - Full CRUD

## Active Record Associations
<!-- http://guides.rubyonrails.org/association_basics.html -->
Users
- has_many :reviews
- has_many :movies, through: :reviews
<!-- validates :name, presence: true, uniqueness: true -->

Movies
- has_many :reviews, dependent: :destroy
- has_many :users, through: :reviews
<!-- validates :title, presence: true, uniqueness: true -->

Reviews
- belongs_to: user
- belongs_to: movie
<!-- look up singular vs. plural -->

## ERDs
### Entities
Users
- Name
- Username
- Email
- Password

Movies
- Title
- Url
- Poster

Reviews
- Title
- Rating
- Comments

### SQl Tables
var user = {
  name: String,
  username: String,
  email: String,
  password: String
};

var movies = {
  title: String,
  url: String,
  poster: String
};

var reviews = {
  title: String,
  rating: Integer,
  comments: String,
  user:references,
  movie:references
};

## Wireframes
Home/Movie Search Partial

Movie/Review Show Partial

Login/Sign Up Partial

User Show/Account Partial

User Account Edit Partial

Review Form Partial

## Technologies Used
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
- User Routes: Signup, Login, Account View, Account Edit, Movie List, Review List
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
- Add CSS/Angular Animations (If we have time)
- Add Flash Messages
- Login via username or email
- Rating for Movies
