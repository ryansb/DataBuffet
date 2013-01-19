#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import sqlalchemy as sa
from datetime import datetime
from sqlalchemy.ext.mutable import Mutable
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

def super_magic():
    from sqlalchemy.orm import scoped_session, sessionmaker
    from sqlalchemy.engine import create_engine
    engine = create_engine('sqlite:////tmp/test.db')
    init_db(engine)
    db = scoped_session(sessionmaker(bind=engine))
    return db


def init_db(engine):
    Base.metadata.create_all(bind=engine)


class TimestampMixin(object):
    created_at = sa.Column(sa.DateTime,
                           default=datetime.now)
