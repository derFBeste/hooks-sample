# Take-Home - SPA

## Getting things up and running

- Clone or [fork](https://help.github.com/en/articles/fork-a-repo) this repoistory
  - ```git clone git@github.com:100health/take-home.git```

- Use tools of your choice to interact with the SQLite database (`db.sqlite`)
    - The database consists of only two tables: `source` and `message`

## Take Home Assessment
You are working with a complicated network of nodes that send messages between each other. One common type of node in this network is a source who will generate messages to be transmitted to another node on the network. You need the create a view or series of views that allows a user to view a particular source and its messages. This is a highly simplified version of what the Redox engine dashboard current does.

Your take home assessment will be to create a front end application and supporting backend API to fetch and view the sources and messages in the network. There is a repo that will serve as a starting point that contains all the data to use as mock data for sources and message.

### Backend API 
Given this data create a backend API that will be able to.

1) Fetch all sources and their basic information
2) Fetch a single source’s information in greater details
3) Fetch all messages for a single source
4) Ability to CRUD source information

Here is the basic API backend route structure we want to see:  
```
    localhost:8888/source  
    localhost:8888/source/:id
    localhost:8888/source/:id/message
    localhost:8888/message
    localhost:8888/message/:mid
```

### Given this API create a front end view that…
1) Allow a user to view all sources
2) Allows a user to view a single source 
   - With more details about the source
   - All the messages for that source
   - An element that displays the aggreate status of messages for a particular source (error, enqueued, finished, processing).

The expected time commitment for this activity is around 5-10 hours. If you find yourself getting far beyond this number, stop, commit what you have, and we can pick it up from there. If you have any questions or suggested improvements, reach out!

### Submission 

1) Send us a link to the forked repo on your personal GitHub account.
2) Zip/Tar the contents of your final project directory and send it to us via a Dropbox or Google Drive link.


# SPA Implementation

## Server

The server was uses Python 3 with [Flask](http://flask.pocoo.org/). Below are the instructions for running it although this probably only works on Mac.

### Running the server:

#### Go to the server directory:
```
cd server
```

#### To activate virtual environment:
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