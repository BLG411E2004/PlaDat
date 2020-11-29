# PlaDat

## Installation

### Clone project repository 

```bash
$ git clone "repository url"
```
### Requirements

1. Install Node.js
2. Install Flask
```bash
$ pip install flask
```
3. Install yarn
```bash
$ npm install -g yarn
```
4. Install Semantic UI
```bash
$ cd {YOUR_GIT_REPOSITORY_PATH}/pladat
$ yarn add semantic-ui-react semantic-ui-css
```
5. 
```bash
$ cd {YOUR_GIT_REPOSITORY_PATH}/pladat
$ npm install react@next react-dom@next
$ npm install jquery
```

## Run the Application

1. First start the flask application
```bash
$ cd {YOUR_GIT_REPOSITORY_PATH}/flask
$ python main.py
```
2. While flask is running start the react application
```bash
$ cd {YOUR_GIT_REPOSITORY_PATH}/pladat
$ yarn start
```