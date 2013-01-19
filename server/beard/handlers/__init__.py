#!/usr/bin/env python
# -*- coding: utf-8 -*-
import tornado.web
import tornado.websocket
from beard.models.users import Session
from beard.models.charts import HighChart

COOKIE_NAME = 'session'


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
        tornado.web.RequestHandler.set_default_headers(self)

    def get_current_user(self):
        session_id = self.get_secure_cookie(COOKIE_NAME)
        if not session_id:
            return None
        session = self.db.query(Session).get(session_id)
        if session:
            return session.user
        return None

    @property
    def db(self):
        return self.application.db


class IndexHandler(BaseHandler):
    def get(self):
        chart_id = self.get_argument('chart_id')
        chart = self.db.query(HighChart).get(chart_id)
        if not chart:
            self.set_status(404)
            self.write("Chart does not exist")
            return
        count = chart.toDict()['chartPoints']
        self.render("index.html", chart_id=chart_id, count=count[1])
