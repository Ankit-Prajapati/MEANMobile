# MEAN Stack Application for Mobile

## Basics Steps for getting Started with MEAN

0. Start with Version Controlling:
> git init

1. Install NodeJS by downloading it from the Website. 
- NPM will also get installed along with it.
- Check node version:
> node --version

- Check npm version:
> npm --version

2. Create **package.json**:
> npm init
- And then follow the Steps.

3. Add **start: app.js** in the **scripts** section to run Node App with the help of npm:
> npm start

4. Add **.gitignore** file.

5. Install **Express** as Dependencies and Save to **package.json**.
> npm install express --save

6. Install **mocha** as Developer Dependency for Testing Framework:
> npm install mocha --save-dev

7. To install all Dependencies including Developer Dependencies:
> npm install

8. Just to install Dependencies for Production:
> npm install --production

9. Now start from the **app.js** file by requiring Express:
var express = require("express");
