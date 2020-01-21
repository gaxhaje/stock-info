# stock-info
#### A Stock info App with Single Page JS Framework

Search for a particular publicly traded company and display a price history for a selected symbol.

- [Getting Started](#getting-started)
- [Configuration options](#configuration-options)
  * [iexcloud.io](#iexclud.io)
  * [token.json](#token.json)
- [Features](#features)
- [Framework](#framework)

#### Getting started
  Download the application.
  ```
  $ git clone git@github.com:gaxhaje/stock-info.git
  $ cd stock-info
  ```

##### Building and Starting
#
  `Development`
  
  `IEX Cloud` provides a `free to start` API to retrieve historical prices:  [https://www.iexcloud.io/docs/api/#historical-prices](https://www.iexcloud.io/docs/api/#historical-prices)
  
  First update `token.json`:
  ```
  {
    "iex_token": "<your free acount token>"
  }
  ```
  Note: there is a token already provided but they have limitations on number of messages retrieved per mont.
  
  Next, you can preview the application in `development` mode by running:
  ```
  $ npm install
  $ npm run dev
  ```
  Now you can see your running application on [`http://localhost:3000/`](http://localhost:3000).
  
  You can press `ctrl + c` in your terminal to `stop` the development server when you're ready to move on.

  `Production`
  
  Look into the `scripts` inside `package.json`:
  ```
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
  ```
  
  First we need to build an optimized `production` build:
  ```
  $ npm run build
  ```
  
  Then, you need to start your Next.js app on a port. This server will do server-side rendering and serve static pages (built with the above command)
  ```
  $ npm run start
  ```
  Now you can see your running application on [`http://localhost:3000/`](http://localhost:3000)
  
  ### Framework
  
  - The React framework for the project is [Next.js](nextjs.org). Next.js is a React framework that provides the follwing features (and more):
    -  Server rendering
    -  Static exporting
    -  CSS-in-JS `styled-jsx`. See [https://github.com/zeit/styled-jsx](https://github.com/zeit/styled-jsx)
    -  Automatic code splitting, filesystem based routing, hot code reloading and universal rendering. `one of my favorite features about it`
    -  Complete control over Babel and Webpack. Customizable server, routing and next-plugins.

#### License MIT
