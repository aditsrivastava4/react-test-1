from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User, ChatMessage

# Handle all database operations
engine = create_engine('postgresql://postgres:{}@localhost/chatdata'.format('94532@dit'))
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)

def get_User(email = None, id = None):
    """
    get_User(email)
            Get detail of local users
    """
    session = DBSession()
    if email:
        data = session.query(User).filter_by(email = email).one_or_none()
    elif id:
        data = session.query(User).filter_by(id = id).one_or_none()
    else:
        raise TypeError('get_User() Requires at 1 Argument(email or id)')
    session.close_all()
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
            name = user_data['name'],
            email = user_data['email']
        )
        user.hash_password(user_data['password'])
        session.add(user)
        session.commit()
        session.close_all()
        return True
    else:
        return False

def addMsg(msgData):
    """
    addMsg(msgData)
            Add new message and the user how sent to database.
    """
    from_user = get_User(msgData['email'])
    session = DBSession()
    msg = ChatMessage(
        message = msgData['message'],
        user = from_user
    )
    session.add(msg)
    session.commit()
    session.close_all()

def getMsg(id = None):
    """
    getMsg(id = None)
            Returns all the messages if id is None
            If id is not None it will return the message which matchs the id
    """
    session = DBSession()
    if id:
        msgData = session.query(ChatMessage).filter_by(id = id).one_or_none()
    else:
        msgData = session.query(ChatMessage).all()
    session.close_all()
    return msgData