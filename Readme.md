# EasyHomes

The is a dynamic web application for posting and browsing real eastate properties and it is made up of two major components, one for backend API and the other for front-end functionality:

## Components

### Loopback 4

The backend REST API is provided by a Loopback 4 based application. The front-end of the website depends on it, which means that this Loopback application must be run before trying to run the frontend part.

It is located in `/server` directory.

### Next.js

This is the frontend of the website i.e. the one containing the UI and is mostly client side, thought there is server side rendering as well which is supported by Next.js.

## How to run the application?

Install the dependencies:

```bash
npm i --prefix ./server ./server 
npm i --prefix client client 
```
