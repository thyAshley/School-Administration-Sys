<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#additional-libraries">Additional Libraries</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>    
    <li><a href="#testing-setup">Testing Setups</a></li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li>
    <a href="#apis">API end point</a>
      <ul>
        <li>
          <a href="#create-classes">Create Classes</a>
        </li>
        <li>
          <a href="#workload-report">Generate workload report</a>
        </li>
      </ul>
    </li>
    <li><a href="#assumptions">Assumption and known Issues</a></li>
  </ol>
</details>
<br/>
<!-- About Project -->

# About The Project

This is a challenge to design and develop the backend API for a school in order for school administrators and teacher to perform various administrative functions.

<br/>

## Additional libraries

- [Supertest](https://www.npmjs.com/package/supertest)

- [ts-jest](https://www.npmjs.com/search?q=ts-jest)

- [cross-env](https://www.npmjs.com/package/cross-env)

<br/>

## Prerequisites

- Node Version: v14.16.0
- mySQL 8.0 or docker installed

if you do not have docker or plan to run the setup on a local/hosted mysql database you can do so by removing the following from package.json and updating the .env file with the correct port number and details

```
"start:services": "docker-compose up -d",
```

<br/>

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/thyAshley/School-Administration-Sys.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start

   ```sh
   npm run start
   ```

4. If you are running the code the first time, please uncomment this line of code to sync the database for the first time in app.ts

<p align="center">
  <img  src="backend/images/initialSetup.PNG">
</p>


## Testing setup

Set up a test database in mySQL call test. This will be use to run our test cases. You can ignore this step if you do not plan to run the test cases

<p align="center">
  <img  src="backend/images/database.PNG">
</p>

Test Runner

```sh
npm run test
```

Expected Output

![test cases](backend/images/testcases.PNG)

<br/>

## Folder Structure

    backend
    ├── database
    ├── images
    ├── node_modules            # external dependencies
    ├── src                     # main folder with source code
        ├── __test__            # contain all the test files
        ├── @types              # additional & custom typing
        ├── config              # configuration and logger folder
        ├── const
        ├── controller          # flow control logic
        ├── errors
        ├── middleware
        ├── models              # database schema and object model
        ├── routers             # route file
        ├── utils               # helper function
        ├── app.ts              # express application
        ├── server.ts           # starter / initialization file

## APIs

### Create classes

- **URL** `/api/register`

- **Method**: `POST`

- **Sample Call**

  ```sh
  {
    “teacher”: {
      name: “Teacher 1”,
      email: “teacher1@gmail.com”
    },
    “students”: [{
        name: “Student 1”,
        email: “student1@gmail.com”
      }, {
        name: “Student 2”,
        email: “student2@gmail.com”
      }],
    “subject”: {
      subjectCode: “ENG”,
      name: “English”
      },
    “class”: {
      classCode: “P1-1”,
      name: “P1 Integrity”
    }
  }
  ```

  **Expected Response**

  Success: `204`

  Error: `400 or 500`

---

### Workload report

- **URL** `/api/reports/workload`

- **Method**: `GET`

- **Sample Response**

  ![report](backend/images/reportSampleResponse.PNG)

  Success: `204`

  Error: `400 or 500`

---

## Assumptions

### Register API

1. I assume that classes and subject combination will be the unique identifier
   to find if i am registrating a new class or updating an existing class as
   each class can have multiple subject and it is difficult to differentiate if i am
   updating / creating a subject + class combination.

2. Given 1) i will remove all teacher and student that were attached to the class
   previously and insert new student and teacher to the class.

3. After removing the teacher/student from the class, we still keep them in the
   database

4. I have made both the teacher and student able to accept either an array of teacher or a single teacher to cater for the updating requirement. To add a new teacher to the class, the user would need to key in the existing teacher otherwise the existing teacher will be removed.

```
teacher: [{
  name: Teacher 1,
  email: teacher1@gmail.com
}],
student: [{
  name: Student 1,
  email: student1@gmail.com
},{
  name: Student 2,
  email: student2@gmail.com
}]

or

teacher: {
  name: Teacher 1,
  email: teacher1@gmail.com
},
student: {
  name: Student 1,
  email: student1@gmail.com
}
```

### Report Generation API

For the report generation api, looking at the requirement, there will likely be an issue when the teacher has the same name.

1. In order to match the test cases given. I will stick with treating the teacher name to be the identifier in the report.

To make the result more uniquely identifible, we can always include the user of the teacher email with the name

---

## Known Issues

1.  Report generation API is not optimize

    I am still trying to figure out a way to perform a groupby and count operation with sequelize.

2.  Bulkcreate does not return the id of the object

    This issue makes it difficult for us to associate the object with another object. For this, i am iterating through

    This issue was reported but i have tried the given method but to no avail.
    https://github.com/sequelize/sequelize/issues/2908

3.  Unable to use transaction committing with unit testing.

    The design of the register api communicates with 4 different model to make sure that it is valid class and register all the necessary detail.

    Initially i used a transaction commit/rollback to rollback whenever there is an issue midway through. This however did not work well with the unit test i wrote as the transaction will never be committed if a single function run true.

    Likely there is a better way to do this that i have not thought of yet.

4.  Upsert seems to not return object with id

    This seems to be similar to (2), currently the work round here is to do a upsert to insert the data and refetch the data from the database.
