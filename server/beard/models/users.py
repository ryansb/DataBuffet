#!/usr/bin/env python
# -*- coding: utf-8 -*-
from uuid import uuid4
import sqlalchemy as sa
#TODO: salt that shit
from hashlib import sha512
from sqlalchemy.orm import relationship
from beard.models import Base, TimestampMixin

class User(Base):
    __tablename__ = 'users'
    id = sa.Column(sa.CHAR(36),
                   primary_key=True,
                   nullable=False)
    name = sa.Column(sa.String,
                     unique=True,
                     nullable=False)
    password = sa.Column(sa.String,
                         nullable=False)

    def __init__(self, username, *args, **kwargs):
        self.id = str(uuid4())
        self.name = username
        Base.__init__(self, *args, **kwargs)

    @classmethod
    def getByName(cls, db, name):
        return db.query(User).filter(User.name == name).first()

    def auth(self, password):
        return sha512(password).hexdigest() == self.password

    def setPass(self, newpass):
        self.password = sha512(newpass).hexdigest()

    def __repr__(self):
        return "User <%s>: id='%s'" % (self.name, self.id)

    def toDict(self):
        return dict(
            name=self.name,
            dashboards=[d.id for d in self.dashboards],
            charts=[c.id for c in self.charts]
        )


class Session(TimestampMixin, Base):
    __tablename__ = 'sessions'
    id = sa.Column(sa.CHAR(36),
                   primary_key=True,
                   nullable=False)

    uid = sa.Column(sa.CHAR(36),
                    sa.ForeignKey('users.id'),
                    nullable=False)
    user = relationship('User',
                         backref='sessions',
                         order_by='Session.created_at')

    def __init__(self, user, *args, **kwargs):
        self.id = str(uuid4())
        if isinstance(user, User):
            self.uid = user.id
        else:
            self.uid = user
        Base.__init__(self, *args, **kwargs)

    def __repr__(self):
        return "Session <%s>: id='%s'" % (self.user.name, self.id)
