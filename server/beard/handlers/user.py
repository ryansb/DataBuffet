#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
from tornado.web import authenticated
from beard.models.users import User, Session
from beard.handlers import BaseHandler, COOKIE_NAME


class SessionHandler(BaseHandler):
    def get(self):
        """
        If user lacks secure cookie with session_id, returns 401
        else, returns the session ID with status 200
        """
        if not self.current_user:
            self.set_status(401)
            self.write("Not authenticated. POST against "
                       "/sessions with username/password")
            return

        self.write({"username": self.current_user.name,
                    "uid": self.current_user.id})
        self.set_status(200)

    def post(self):
        """
        Args:
            Username
            Password
        """
        uname = self.get_argument('username')
        passwd = self.get_argument('password')
        session_id = self.get_secure_cookie(COOKIE_NAME)
        if session_id:
            if self.db.query(Session).get(session_id):
                self.set_status(200)
            else:
                self.write("Invalid session, please log in again.")
                self.clear_cookie(COOKIE_NAME)
                self.set_status(401)
            return

        u = User.getByName(self.db, uname)
        if not u:
            self.set_status(410)
            self.write("User does not exist")
            return
        if not u.auth(passwd):
            self.set_status(401)
            self.write("Invalid password")
            return
        session = Session(u)
        if not self.get_secure_cookie(COOKIE_NAME):
            self.set_secure_cookie(COOKIE_NAME, session.id)
            self.db.add(session)
            self.db.commit()
            self.set_status(201)
            return
        self.set_status(200)

    def delete(self):
        if self.get_secure_cookie(COOKIE_NAME):
            c = self.get_secure_cookie(COOKIE_NAME)
            self.clear_cookie(COOKIE_NAME)
            try:
                self.db.delete(self.db.query(Session).get(c))
                self.db.commit()
            except Exception:
                pass
            self.set_status(200)


class UserHandler(BaseHandler):
    @authenticated
    def get(self):
        """
        If user lacks secure cookie, returns 401
        else, returns JSON structured as:
            {"name": "ryansb",
             "dashboards": ["0d769e38-cb0f-444b-a82e-82e02b5d57f6",
                            "534d12c6-b219-4f3f-a97c-fac49cb0ee90"],
             "charts": ["0b566668-6881-4603-a18a-b3dd4d620329",
                                 "0a1d2af3-beca-4690-beed-c6321f68fc1d"]
            }

        The "dashboards" and "charts" attributes represent charts and
        dashboards that the user has write access to. For the full list of
        charts or dashboards.
        """
        self.write(json.dumps(self.current_user.toDict()))
        self.set_status(200)

    def post(self):
        """
        Args:
            username
            password
        """

        if self.db.query(User).filter(User.name == self.get_argument('username')).all():
            self.write("User exists")
            self.set_status(200)
            return

        u = User(self.get_argument('username'))
        u.setPass(self.get_argument('password'))
        self.db.add(u)
        session = Session(u)
        if not self.get_secure_cookie(COOKIE_NAME):
            self.set_secure_cookie(COOKIE_NAME, session.id)
        self.db.add(session)
        self.db.commit()
        self.write("OK")
        self.set_status(201)
