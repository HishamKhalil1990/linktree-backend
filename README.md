- open terminal (`cmd` for windows)
- ensure `node js` is installed or install [node js](https://nodejs.org/en/download/)
- install folder from GitHub using git clone
- in your database provider as `mysql`, `sql`or `postgresql` create database called `linktree`
- rename file `.example.env` with `.env`
- put the database connection url in `.env` after `DATABASE_URL=` as example `mysql://username:password//localhost:3306` then add to the url `/linktree` to become `mysql://username:password//localhost:3306/linktree`
- in `schema.prisma` in `prisma` folder type the database provider as `provider = "mysql"` default is `mysql`
- in terminal type `cd`, press `space` and paste the `path to folder` as `C:\~linktree-backend` and hit `enter`
- run `npm install`
- run `npm run generate`
- run `npm run migrate`
- run `node start`

for get all users (for development `base_url = http://localhost:3000`):

- `get('base_url/Users')`

for register (for development `base_url = http://localhost:3000`):

- `post('base_url/Register/Password')` with `'Content-Type': 'application/json'` and `data:{
    "username": "john",
    "email": "john@gmail.com",
    "password": "1234"
}`

- `post('base_url/Register/Phone')` with `'Content-Type': 'application/json'` and `data:{
    "username": "john",
    "phoneNumber": "0788888888"
}`

- `get('base_url/Verfication/token')`

- `put('base_url/Info/Email')` with `'Content-Type': 'application/json'`, `headers: {
      'Authorization': 'Bearer token'
    }` and `data:{
    "email":"john@gmail.com"
}`

for login (for development `base_url = http://localhost:3000`):

- `post('base_url/Login/Password')` with `'Content-Type': 'application/json'` and `data:{
    "username": "john",
    "password": "1234"
}`

- `post('base_url/Login/Phone')` with `'Content-Type': 'application/json'` and `data:{
    "phoneNumber": "0788888888"
}`
