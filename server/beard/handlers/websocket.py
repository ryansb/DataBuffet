#!/usr/bin/env python
# -*- coding: utf-8 -*-
import tornado.websocket
from beard.models.charts import HighChart


class StatusHandler(tornado.websocket.WebSocketHandler):
    chart = None

    def open(self):
        chart_id = self.get_argument('chart_id')
        self.chart = self.application.db.query(HighChart).get(chart_id)
        self.chart.addCallback(self.callback)
        self.write_message(self.chart.toJson())

    def on_close(self):
        self.chart.removeCallback(self.callback)

    def on_message(self, message):
        pass

    def callback(self, chart):
        self.write_message(chart.toJson())
