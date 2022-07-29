# Project title : Todo

React URL Shortner App - Shortly

## Table of Content:

- [About the project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies used](#technologies-used)
- [Build](#build)
- [Serve](#serve)

<!-- Create a title of about the project with id about-the-project -->

# About the project

This project is a simple URL shortner app.
It is a React app that allows you to shorten a link, copy it and shows history of previously shortened urls.
The data is stored in the browser's local storage.
The app is responsive and works on mobile and desktop.

# Installation

Clone the repository and run the following command:

`npm install` or `yarn install` to install the dependencies.

After that, run the following command:

`npm start` or `yarn start` to start the app.

the project is running on [localhost](http://localhost:3000)

# Usage

There are 2 pages in the app.

- [Home](http://localhost:3000/)
- [Conatct](http://localhost:3000/contact)

There are 3 components in the app:

- Alert: This component shows an alert with the respective message.
- Modal: This component shows respective information regarding the url.
- Navbar: This component allows you to navigate through the app.

Utils Folder is also included where all necessary Helper functions are present.

# Testing

Following are the tests done

- Validate Email
- Validate Name
- Validate URL

# Technologies used

The app is built with React and uses the following technologies:

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [shrtco.de](https://shrtco.de/)

# API Reference

https://shrtco.de/docs/

A request is made to

```javascript
`https://api.shrtco.de/v2/shorten?url=${url}`;
```

# Build

Run the following command to build the app:

`npm run build` or `yarn build`

# Serve

Run the following command to install the dependencies serve:

`npm install -g serve` or `yarn install -g serve`

Then run the following command to start the app:

`serve -s build` or `yarn serve -s build`
