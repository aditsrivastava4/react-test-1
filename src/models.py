from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from passlib.hash import pbkdf2_sha256
import datetime
import json

dbCredential = json.loads(
	open('DBcredential.json', 'r').read()
)
dbName = dbCredential['DBname']
password = dbCredential['password']


Base = declarative_base()

class User(Base):
	"""
	class User will store data of users how sign up or login without any OAuth.
	Parameters
	name: Store Name(String)
	email: Store user Email(String)
	password_hash: Store hashed password(String)
	Functions
	hash_password(password)
        Takes a parameter password(String) as input and
        hash it using passlib.hash.pbkdf2_sha256 and store it in password_hash.
	verify_password(password)
        Takes a parameter password(String) as input and
        verify it if matches the stored password_hash using passlib.hash.pbkdf2_sha256.
	"""
	__tablename__ = 'user'
	id = Column(Integer, primary_key=True)
	name = Column(String)
	email = Column(String)
	password_hash = Column(String(255))

	def hash_password(self, password):
		self.password_hash = pbkdf2_sha256.hash(password)

	def verify_password(self, password):
		return pbkdf2_sha256.verify(password, self.password_hash)


class ChatMessage(Base):
	"""
	class ChatMessage will store all messages and the user who send it
	Parameters
	message: Store message(String)
	timeStamp: Store TimeStamp when the message was sent(DateTime)
	from_user: Foreign Key from User model
	"""
	__tablename__ = 'chat_message'
	id = Column(Integer, primary_key=True)
	message = Column(String)
	timeStamp = Column(DateTime, default=datetime.datetime.now)
	from_user = Column(Integer, ForeignKey('user.id'))
	user = relationship('User')

engine = create_engine('postgresql://postgres:{}@localhost/{}'.format(password, dbName))
Base.metadata.create_all(engine)