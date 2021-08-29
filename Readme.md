# EasyHomes

The is a dynamic web application for posting and browsing real estate properties and it is made up of two major components, one for backend API and the other for front-end functionality:

## Loopback 4

The backend REST API is provided by a Loopback 4 based application. The front-end of the website depends on it, which means that this Loopback application must be run before trying to run the frontend part.

It is located in `/server` directory.

## Next.js

This is the frontend of the website i.e. the one containing the UI and is mostly client side, thought there is server side rendering as well which is supported by Next.js.

It is located in `/client` directory.

## How to run the application?

Because the applciation is composed to two parts i.e. the backend (Loopback) and the frontend (Next.js), we need to run both to be able to use the application. Both of thse need to be running in seperate terminals.

Please run the following commands in the given order.

Install and run server:

```bash
cd server
npm install
npm run start
```

Install and run client (in a seperate terminal):

```bash
cd client
npm install
npm run dev
```

You may also do `npm run build` and then `npm run start` on `/client` directory to start optimized production build on frontend.

## Access the application

The application should now be running at [localhost:3000](http://localhost:3000)

To access the backend i.e. REST API explorer, go to [localhost:3001/explorer](http://localhost:3001/explorer)

## Database and data persistence

To allow easir testing and development, the app currently uses an in-memory database instead of persisted on storage databases such as MySQL or PostgreSQL.

However, switching to a persited DB is straightforward and just requires configuring it in `/server/src/datasources/db.datasource.ts`

Currently we didn't connect a PostgreSQL db so that the grader is able to test the application without having to run a database instance.

## User guide

To use the application as a user, an account needs to be created. To do this, go to [localhost:3000](http://localhost:3000) click "Signup" near the upper right corner. Signup using any real or fake email. If the signup fails, try a different email and username combination.

### User roles

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
<details>
  <summary>User credentials, SECRET!! (please click to reveal)</summary>

  ```JS
  [
    {
        email: "user1@example.com",
        password: "useruser"
    },
    {
        email: "user2@example.com",
        password: "useruser"
    }
  ]
  ```
</details>

You may also create your own user account by signing up in the upper right hand corner.

Admins have rights to delete properties if users have reported them. Admins can also set other users as verified or unverified.

Properties posted by verified users have a green badge in grid view.

When the app is launched there are two user accounts created as well just to enable creation of dummy properties under those accounts.


### How to create more admin roles?

Please go to `/server/src/observers/seed.observer.ts` and add a new object entry to `const users` array. This can be used for creating other types of users as well, and for admin, the property `realm` should be `admin`. Please note that duplicate entries will fail, so double check the values for `email` and `username`.

Once the above is done, please restart the server by stopping the server process and then do:

```bash
npm run start ## on /server directory
```

## How to use the application?

### Not signed in

A user who is not signed in to the application can still browse the properties, filter the properties by different criteria such as type of property, whether it is for sale or rent, price/rent and area range. Users are also able to tell if the property is posted by a verified user (a green badge is shown on properties posted by verified users).

However, for features such as posting properties, reporting properties, etc., the user need to be logged in. For this, you need to click "Signup" in the upper right corner, or directly navigate to [localhost:3000/signup](http://localhost:3000/signup).

Please enter a username, email and password. Password is verified to ensure you enter the exact password you think you are typing.

### Normal user

Once signed up, you will have a user account that will have `unverified` role. Later you may request an admin to set your role to `verified` user. Both of these roles are normal users, while there is a third role `admin` that has far reaching rights including ability to delete properties if the users report them.

Normal users as well as admins are able to post properties and edit the properties they have posted. To view and edit the properties you have posted, please click on your username in the upper right hand corner.

As a signed in user, you are able to report properties that you beleive are fradulent or spam. To do this, you need to click "View" button on a property card and then on the following page, click on "Report". Remember that you are not able to report properties that you yourself posted, however you are able to edit those properties.

### Admin user

Admin users are able to set other users as `verified` or `unverified`. Verified users will have green "Verified" badge on the propertie they have posted. To do this, click on "Verify" in the top navigation bar. You will see a list of users and a button to set them as either verified or unverified. Admin roles themselves cannot be modified.

Admin users are able to view and act of the reports filed by users on suspected fradulent or spam properties. To do this, click "Reports" in the navbar on the top. If there are any reports, you will see a table listing the properties and the number of reports against each property. Properties having more reports against them will be at the top. To view and act on the reports, click on "View" on any row and then you are able to see the actual message of the reports and you are able to delete the property in question if you are convinced that the reports are reasonable and legit.
