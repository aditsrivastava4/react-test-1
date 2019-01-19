from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from passlib.hash import pbkdf2_sha256

Base = declarative_base()


class User(Base):
	"""
	class User will store data of users how sign up or login without any OAuth.
	Parameters
	username: Store Username(String)
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
	password_hash = Column(String(200))

	def hash_password(self, password):
		self.password_hash = pbkdf2_sha256.hash(password)

	def verify_password(self, password):
		return pbkdf2_sha256.verify(password, self.password_hash)

engine = create_engine('postgresql://postgres:{}@localhost/chatdata'.format('94532@dit'))
Base.metadata.create_all(engine)