from flask import request, Response
from flask_restplus import Api, Resource, fields
import sqlite3

from app import app, db
from app.models import Message, Source
from app.schema import MessageSchema, SourceSchema

api = Api(app)

# localhost:8888/source  
# localhost:8888/source/:id
# localhost:8888/source/:id/message
# localhost:8888/message
# localhost:8888/message/:mid

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

    def post(self):
        # source = request.get_json()
        try:
            # TODO: return new record
            return {}
        except ValidationError as err:
            return jsonify(err.messages), 422

@api.route('/source/<string:id>')
class SourceController(Resource):
    def get(self, id):
        # 80fe6e1e-6f1b-4b3c-957c-275d12bb3e48
        source = Source.query.get(id)
        return source_schema.dump(source).data

    def put(self, id):
        try:
            # TODO: update record
            return 'success'
        except ValidationError as err:
            return jsonify(err.messages), 422

    def delete(self, id):
        try:
            # TODO: delete record
            return 'success'
        except ValidationError as err:
            return jsonify(err.messages), 422
        
# TODO: use a session to make querying messages more performant

@api.route('/source/<string:source_id>/messages')
class GetSourceMessages(Resource):
    def get(self, source_id):
        # testing id: 80fe6e1e-6f1b-4b3c-957c-275d12bb3e48
        # TODO: make more perfomant, sessions?
        messages = Message.query.all()
        source_messages = [m for m in messages if m.source_id == source_id]
        return messages_schema.dump(source_messages).data

@api.route('/source/<string:source_id>/messages/status')
class GetSourceMessages(Resource):
    def get(self, source_id):
        # testing id: 80fe6e1e-6f1b-4b3c-957c-275d12bb3e48
        # TODO: make more perfomant, sessions?
        messages = Message.query.all()
        source_messages = [m for m in messages if m.source_id == source_id]
        return messages_schema.dump(source_messages).data

# TODO: auto generate id
# source_model = api.model('Source Model', {
#     'say' : fields.String
# })

# source_fields = {}


@api.route('/health-check')
class Test(Resource):
    def get(self):
        return 'health check!'