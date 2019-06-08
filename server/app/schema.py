from marshmallow_sqlalchemy import ModelSchema
from app.models import Message, Source

class MessageSchema(ModelSchema):
    class Meta:
        model = Message

class SourceSchema(ModelSchema):
    class Meta:
        model = Source