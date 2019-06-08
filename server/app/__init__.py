from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os
basedir = os.path.abspath(os.path.dirname(__file__))
db_file = os.path.join(basedir, '/data/db.sqlite')

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{basedir}/data/db.sqlite'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
from app import routes, models, schema
