from app import app, db
from flask_restplus import Api, Resource
import sqlite3
# from marshmallow_sqlalchemy import ModelSchema

from app.models import Message, Source
from app.schema import MessageSchema, SourceSchema


api = Api(app)

# localhost:8888/source  
# localhost:8888/source/:id
# localhost:8888/source/:id/message
# localhost:8888/message
# localhost:8888/message/:mid

# class MessageSchema(ModelSchema):
#     class Meta:
#         model = Message

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)
source_schema = SourceSchema()
sources_schema = SourceSchema(many=True)

@api.route('/message')
class GetMessages(Resource):
    def get(self):
        messages = Message.query.all()
        return messages_schema.dump(messages).data

@api.route('/message/<string:id>')
class GetMessage(Resource):
    def get(self, id):
        # 23fc65c2-29bf-4208-85ec-b54629b76bc1
        message = Message.query.get(id)
        return message_schema.dump(message).data

@api.route('/source')
class GetSources(Resource):
    def get(self):
        sources = Source.query.all()
        return sources_schema.dump(sources).data

@api.route('/source/<string:id>')
class GetSource(Resource):
    def get(self, id):
        # 80fe6e1e-6f1b-4b3c-957c-275d12bb3e48
        source = Source.query.get(id)
        return source_schema.dump(source).data


@api.route('/health-check')
class Test(Resource):
    def get(self):
        return 'health check!'