# SPA Implementation

## Server

The server was uses Python 3 with [Flask](http://flask.pocoo.org/). Below are the instructions for running it although this probably only works on Mac.

### Running the server:

#### Go to the server directory:
```
cd server
```

#### Install a virtual env:

This requires Python 3. If you have that install `venv` is included in the standard library.

```
python -m virtualenv venv
```


#### Activate virtual environment:
```
. venv/bin/activate
```

#### To Install dependencies:
```
pip3 install -r requirements.txt
```

#### To run server
```
./run.sh dev
```

This should run a flask server on port 8888. You can see Open API docs on http://localhost:8888/ .


## Client

The client is implemented with React and Typescript. Generated with [create-react-app](https://github.com/facebook/create-react-app).

### Running the frontend:

#### Go to the client directory:
```
cd client
```

#### Install the packages via npm:
```
npm install
```

#### Start the app:
```
npm start
```
