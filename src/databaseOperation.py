from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User

# Handle all database operations
engine = create_engine('postgresql://postgres:{}@localhost/chatdata'.format('94532@dit'))
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)

def get_User(email):
    """
    get_User(email)
            Get detail of local users
    """
    session = DBSession()
    data = session.query(User).filter_by(email=email).one_or_none()
    session.close_all()
    print(data)
    return data


def verify_UserPassword(email, password):
    """
    verify_UserPassword(email, password)
            Verify local users password at the time of login
    """
    result = get_User(email).verify_password(password)
    return result


def add_SignUp(user_data):
    """
    add_SignUp(user_data)
            Users who sign up as local user are added to the database
    """
    data = get_User(user_data['email'])
    if not data:
        session = DBSession()
        user = User(
            name=user_data['name'],
            email=user_data['email']
        )
        user.hash_password(user_data['password'])
        session.add(user)
        session.commit()
        session.close_all()