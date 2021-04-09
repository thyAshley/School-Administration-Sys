<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#additional-libraries">Additional Libraries</a></li>
    <li>
      <a href="#additional-setup">Additional Setup</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#apis">API end point</a></li>
    3<li><a href="#assumptions">Assumption and Outstanding Issues</a></li>
  </ol>
</details>
<br/>
<!-- About Project -->

# About The Project

This is a challenge to design and develop the backend API for a school in order for school administrators and teacher to perform various administrative functions.

<br/>

## Additional libraries

---

> [Supertest](https://www.npmjs.com/package/supertest)

> [ts-jest](https://www.npmjs.com/search?q=ts-jest)

> [cross-env](https://www.npmjs.com/package/cross-env)

<br/>

## Additional Setup

---

Change of test script to the following to enable watchmode and setting test environment when running npm run test

```sh
"test": "cross-env NODE_ENV=test jest --watchAll --runInBand --detectOpenHandles"
```

<br/>

## Prerequisites

---

- Node Version: v14.16.0
- mySQL 8.0

<br/>

## Installation

---

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start
   ```sh
   npm run start
   ```

## APIs

---

### Create classes

- **URL** `/api/register`

- **Method**: `GET`

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
