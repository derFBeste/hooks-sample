from flask import request, Response, jsonify
from flask_restplus import Api, Resource, fields, ValidationError
import uuid, datetime, sqlite3
from collections import Counter
import time # TODO: remove

from app import app, db
from app.models import Message, Source
from app.schema import MessageSchema, SourceSchema

api = Api(app)

source_model = api.model('Source', {
    'name' : fields.String(),
    'environment' : fields.String(),
    'encoding' : fields.String(),
})

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
        message = Message.query.get(id)
        return message_schema.dump(message).data

@api.route('/source')
class GetSources(Resource):
    def get(self):
        sources = Source.query.all()
        return sources_schema.dump(sources).data

    @api.expect(source_model)
    def post(self):
        try:
            source = Source(**request.json)
            source.id = str(uuid.uuid1())
            db.session.add(source)
            db.session.commit()
            
            return source_schema.dump(source).data

        except ValidationError as err:
            return jsonify(err.messages), 422

@api.route('/source/<string:id>')
class SourceController(Resource):
    def get(self, id):
        source = Source.query.get(id)
        return source_schema.dump(source).data

    def delete(self, id):
        try:
            source = Source.query.get(id)
            db.session.delete(source)
            db.session.commit()
            return f'deleted: {id}'
        except ValidationError as err:
            return jsonify(err.messages), 422

    @api.expect(source_model)
    def put(self, id):
        try:
            source = Source.query.get(id)
            source.name = request.json['name']
            source.environment = request.json['environment']
            source.encoding = request.json['encoding']
            source.updated_at = datetime.datetime.utcnow()
            
            db.session.commit()

            return source_schema.dump(source).data

        except ValidationError as err:
            return jsonify(err.messages), 422
        
@api.route('/source/<string:source_id>/messages')
class GetSourceMessages(Resource):
    def get(self, source_id):
        messages = Message.query.filter(Message.source_id == source_id).all()
        return messages_schema.dump(messages).data

@api.route('/source/<string:source_id>/messages/status')
class GetSourceMessages(Resource):
    def get(self, source_id):
        messages = Message.query.filter(Message.source_id == source_id).all()
        statuses = [sm.status for sm in messages]
        count = Counter()
        for status in statuses:
            count[status] += 1
        temp_result = dict(count)
        status_types = ['enqueued', 'processing', 'finished', 'error'] # used for ordering statuses

        ordered_result = {}
        for t in status_types:
            ordered_result[t] = temp_result[t]

        return ordered_result

@api.route('/health-check')
class HealthCheck(Resource):
    def get(self):
        return 'health check!'