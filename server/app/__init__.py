from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

import os
basedir = os.path.abspath(os.path.dirname(__file__))
db_file = os.path.join(basedir, '/data/db.sqlite')

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{basedir}/data/db.sqlite'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app) # WARNING: allows CORS, only use locally

db = SQLAlchemy(app)
from app import routes, models, schema
