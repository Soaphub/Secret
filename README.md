# Full stack - Secrets project

The web application where users can post their secrets anonymously.   

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview


### The challenge

I was able to:

- View the optimal layout for each of the website's pages depending on their device's screen size
- To maintain the user password using mongo db locally.
- Initialze OAth for client side web-application

### Links

- Solution URL: https://github.com/Soaphub/Secret

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Bootsrap Grid and cards
- Mongo DB for datatbase
- Passport, authentication middleware for Node.js
- Mobile-first workflow


### What I learned

```html
 <a class="btn btn-social btn-google" href="/auth/google" role="button">
            <i class="fab fa-google"></i>
            Sign Up with Google
          </a>
```
```.js
  app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));
```

## Author

- Website - Ambadi M P (https://github.com/Soaphub/Secret)

## Acknowledgments

The udemdy coarse by Angela helped a lot in completing the project.
