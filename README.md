# rfc2209-FEC

> ### Group members<br>
[Michael Raisch](https://github.com/LikeMike07),
[Miles Owens](https://github.com/milrilowe),
[Tuan Nguyen](https://github.com/TuanNguyen4),
[Jonathan Navarrete](https://github.com/Ragnaric)


[^1]: Click on name to checkout team members GitHub
## Table of Contents

1. [Description](#description)
2. [Technical Overview](#technical-overview)
3. [Usage](#usage)
4. [Requirements](#requirements)


## Description
Project Atelier is a front-end business app for online retail. It was designed with simplicity and visual appeal in mind. The sleek, straight-forward, and user-friendly design of the website allows for easy access to the navigation panel that is always present at the top of the page no matter where the viewport is located. The navigation panel includes a search bar and a button to switch to dark-mode.

The Overview is the first component that the user sees, which brings the products at the forefront in the image gallery. The image gallery was implemented as a slider component to allow for a seamless transition when viewing the different styles that are available.

The Related Products component that follows was also envisioned as a slider component to provide a better user experience while browsing through the catalog. Each related product is displayed as a card that will redirect to the image gallery when clicked. The card includes a star icon that brings up a modal to compare the features of the current product in the image gallery with the respective card that was selected.

Immediately below is the Outfit Creation component where the user can store a product with the Add to Outfit card. Any stored products will remain on the user's list even when refreshing or leaving the website.

The Questions and Answers component contains three subcomponents: a search bar for questions, a display area for the answers, and a button to add a question.

The Ratings and Reviews component contains two main subcomponents: a star ratings section and a review section.

There is also a button at the bottom-right corner for convenience to scroll back to the top.


## Technical Overview
Atelier was built with Node.js, Webpack, Babel, React, Axios, and conventional CSS.


## Usage
In order to run the project locally please read [Requirements](#requirements) section for instructions setting up a local .env and for installing dependencies. Find further instructions for setting up the project for development or production in the [Development](#development) and [Production](#production) sections.

## Requirements

Node.js - version 16.0 or higher


### Installing Dependencies

> 1. Move into the root directory of the repository
> 2. Rename .env.example to .env and supply the appropriate values. Note: API_URL should end with / but base URL should not. Do not include quotation marks or semi-colons.
> 3. Run ```npm install``` to install all required dependencies
