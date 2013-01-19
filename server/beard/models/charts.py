#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
from uuid import uuid4
import sqlalchemy as sa
from collections import defaultdict
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declared_attr
from beard.models import Base, TimestampMixin


chart_dash_association_table = sa.Table(
    'association', Base.metadata,
    sa.Column('dash_id', sa.CHAR(36), sa.ForeignKey('dashboards.id')),
    sa.Column('chart_id', sa.CHAR(36), sa.ForeignKey('highcharts.id'))
)


class Dashboard(TimestampMixin, Base):
    __tablename__ = 'dashboards'

    id = sa.Column(sa.CHAR(36),
                   primary_key=True,
                   nullable=False)
    name = sa.Column(sa.String,
                     nullable=True)
    owner_id = sa.Column(sa.CHAR(36),
                         sa.ForeignKey('users.id'),
                         nullable=False)
    owner = relationship('User',
                         backref='dashboards',
                         order_by='Dashboard.created_at')
    charts = relationship('HighChart',
                          secondary=chart_dash_association_table)

    def __init__(self, *args, **kwargs):
        self.id = str(uuid4())
        Base.__init__(self, *args, **kwargs)

    def __repr__(self):
        return "Dashboard <%s>: id='%s' owner='%s'" % (self.name, self.id,
                                                       self.owner.name)

    def toDict(self):
        return dict(
            id=self.id,
            name=self.name,
            charts=[c.id for c in self.charts]
        )
    def toJson(self):
        return json.dumps(self.toDict())


class HighChart(TimestampMixin, Base):
    callbacks = defaultdict(list)
    __tablename__ = 'highcharts'
    id = sa.Column(sa.CHAR(36),
                   primary_key=True,
                   nullable=False)
    owner_id = sa.Column(sa.CHAR(36),
                         sa.ForeignKey('users.id'),
                         nullable=False)
    owner = relationship('User',
                         backref='charts',
                         order_by='HighChart.created_at')
    dashboards = relationship('Dashboard',
                              secondary=chart_dash_association_table)
    json = sa.Column(sa.String())

    def __init__(self, *args, **kwargs):
        self.id = str(uuid4())
        self.json = sa.Column(sa.String())
        TimestampMixin.__init__(self, *args, **kwargs)
        Base.__init__(self, *args, **kwargs)

    @property
    def data(self):
        return json.loads(self.json)

    @data.setter
    def set_data(self, value):
        self.json = json.dumps(value)
        self.notifyCallbacks()

    def notifyCallbacks(self):
        for callback in self.callbacks[self.id]:
            callback(self)

    def addCallback(self, callback):
        if callback in self.callbacks[self.id]:
            return

        self.callbacks[self.id].append(callback)
        self.notifyCallbacks()

    def removeCallback(self, callback):
        if callback not in self.callbacks[self.id]:
            return

        try:
            self.callbacks[self.id].remove(callback)
        except ValueError:
            pass
        del callback
        self.notifyCallbacks()

    def updateData(self, updict):
        d = self.data
        d.update(updict)
        self.json = json.dumps(d)
        self.notifyCallbacks()

    def toJson(self):
        return json.dumps(self.toDict())

    def toDict(self):
        return dict(
            id=self.id,
            owner_id=self.owner_id,
            dashboard_ids=[d.id for d in self.dashboards],
            highchart=self.json
        )
