#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
from tornado.web import authenticated
from beard.handlers import BaseHandler
from beard.models.charts import Dashboard, HighChart


class DashboardHandler(BaseHandler):
    @authenticated
    def get(self, dash_id=None):
        """
        If user lacks secure cookie, returns 401
        else, returns JSON structured as:
            {"dashboards": [
                {"id": "cfafd7f5-41b1-4310-9b56-298225de7720",
                 "charts": ["71c2c821-a3c6-43cc-9439-8a16ce7b1189",
                            "0593fc8f-a501-41c3-b9fc-29436f58a404"]
                },
                {"id": "5e7bf525-b135-458f-a98e-bf24d0b8a70b",
                 "charts": ["8152c86c-1795-4aba-b64b-4a408e93aeb4",
                            "37fdbb57-bdcd-435b-a4ff-7caea3825fba",
                            "dc0053e6-89fb-4755-804c-c064aacf058d",
                            "0d769e38-cb0f-444b-a82e-82e02b5d57f6"]
                }
            ]
            }
        """
        data = {
            "dashboards": [
                d.toDict() for d in self.current_user.dashboards]
        }
        if dash_id:
            dash = self.db.query(Dashboard).get(dash_id)
            self.write(dash.toJson())
        else:
            data = {
                "dashboards": [
                    c.toDict() for c in self.current_user.dashboards]
            }
            self.write(json.dumps(data))
        self.set_status(200)

    @authenticated
    def post(self, dash_id=None):
        """
        Args
            name
            charts (json list)
        """
        if dash_id:
            if dash_id in [d.id for d in self.current_user.dashboards]:
                self.set_status(200)
        else:
            d = Dashboard()
            d.name = self.get_argument('name')
            charts = json.loads(self.get_argument('charts', None))
            for chart_id in charts:
                d.charts.append(self.db.query(HighChart).get(chart_id))
            d.owner_id = self.current_user.id
            self.db.add(d)
            self.db.commit()
            self.write(json.dumps(d.toDict()))


class ChartHandler(BaseHandler):
    @authenticated
    def get(self, chart_id=None):
        """
        If user lacks secure cookie, returns 401
        else, returns JSON structured as:
            {"charts": [
                {"id": "cfafd7f5-41b1-4310-9b56-298225de7720",
                 "name": "Test Chart",
                 "chartPoints": [[4,5],
                                 [7,6]]
                },
            ]
            }
        """
        if chart_id:
            chart = self.db.query(HighChart).get(chart_id)
            self.write(chart.toJson())
        else:
            data = {
                "charts": [
                    c.toDict() for c in self.current_user.charts]
            }
            self.write(json.dumps(data))
        self.set_status(200)

    @authenticated
    def post(self):
        """
        Args:
            highchart
        """
        #make a chart
        chart = HighChart()
        chart.owner_id = self.current_user.id
        chart.json = self.get_argument('highchart')

        self.write(chart.toJson())
        chart.notifyCallbacks()
        self.set_status(200)
        self.db.add(chart)
        self.db.commit()

    @authenticated
    def put(self, chart_id):
        """
        Args:
            highchart
        """

        chart = self.db.query(HighChart).get(chart_id)

        try:
            js = json.loads(self.get_argument('highchart'))
        except ValueError, e:
            print "INVALID SHIT", self.get_argument('highchart')
            raise e
        chart.json = json.dumps(js)

        self.write(chart.toJson())
        chart.notifyCallbacks()
        self.db.add(chart)
        self.db.commit()
        self.set_status(200)
