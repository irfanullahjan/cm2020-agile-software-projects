# EasyHomes

The is a dynamic web application for posting and browsing real estate properties and it is made up of two major components, one for backend API and the other for front-end functionality:

## Components

### Loopback 4

The backend REST API is provided by a Loopback 4 based application. The front-end of the website depends on it, which means that this Loopback application must be run before trying to run the frontend part.

It is located in `/server` directory.

### Next.js

This is the frontend of the website i.e. the one containing the UI and is mostly client side, thought there is server side rendering as well which is supported by Next.js.

## How to run the application?

Please run the following commands in the given order.

Install server:

```bash
cd server
npm install
cd ..
```

Install cient:

```bash
cd client
npm install
cd ..
```

Start server:

```bash
cd server
npm run start
```

Start client (In a seperate terminal):

```bash
cd client
npm run dev
```

## Access the application

The application should now be running at [localhost:3000](http://localhost:3000)

To access the backend i.e. REST API explorer, go to [localhost:3001/explorer](http://localhost:3001/explorer)

## User guide

To use the application as a user, an account needs to be created. To do this, go to [localhost:3000](http://localhost:3000) click "Signup" near the upper right corner. Signup using any real or fake email. If the signup fails, try a different email and username combination.

## User rights

The website supports admin roles, and normal user roles (either verified or unverified) however, for security reasons, admin roles are not made using the signup form. For testing purpose, the following admin role is available for you to use:

<details>
  <summary>Admin credentials, SECRET!! (please click to reveal)</summary>

  ```JS
  {
      email: "admin1@example.com",
      password: "admin!234"
  }
  ```
</details>

Admins have rights to delete properties if users have reported them. Admins can also set other users as verified or unverified.

Properties posted by verified users have a green badge in grid view.

When the app is launched there are two user accounts created as well just to enable creation of dummy properties under those accounts.

You may also create your own user account by signing up in the upper right hand corner.


### How to create more admin roles?

Please go to `/server/src/observers/seed.observer.ts` and add a new object entry to `const users` array. This can be used for creating other types of users as well, and for admin, the property `realm` should be `admin`. Please note that duplicate entries will fail, so double check the values for `email` and `username`.

Once the above is done, please restart the server by stopping the server process and then do:

```bash
npm run start ## on /server directory
```

## Database and data persistence

To allow easir testing and development, the app currently uses an in-memory database instead of persisted on storage databases such as MySQL or PostgreSQL.

However, switching to a persited DB is straightforward and just requires configuring it in `/server/src/datasources/db.datasource.ts`

Currently we didn't connect a PostgreSQL db so that the grader is able to test the application without having to run a database instance.