from collections import Counter
import json
import re

from flask import Blueprint
from flask import current_app
from flask import flash
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for

from flask import jsonify

from ..models import businessLogic as model


bp = Blueprint("businessLogic", __name__)

columns = ["id", "storeName", "toppings", "pizzaSizes", "flagDelivery", "flagDeliveryMinimumFee", "deliveryMinimumFee", "waitTimeMinutesDelivery", "waitTimeMinutesTakeout"]

jsonColumns = ["toppings", "pizzaSizes"]
boolColumns = ["flagDelivery", "flagDeliveryMinimumFee"]

@bp.route("/businesslogic/<int:id>", methods=("GET",))
def get(id):
    if id:
        try:
            id = int(id)
        except:
            current_app.logger.warning('Failed to cast id %s to int' % id)

    row = model.get(id)

    if row is None:
        return jsonify(None)

    data = dict(zip(columns, row))
    for col in jsonColumns:
        data[col] = json.loads(data[col])

    for col in boolColumns:
        if data[col] == 0:
            data[col] = False
        elif data[col] == 1:
            data[col] = True 
    return jsonify(data)

@bp.route("/businesslogic", methods=("POST",))
def create():
    """Insert a record"""
    id = None

    data = request.json
    error = None

    if not data:
        error = "data is required."

    if error is not None:
        flash(error)
    else:
        for col in jsonColumns:
            data[col] = json.dumps(data[col])

        id = model.insert(data)
    return jsonify(id)

@bp.route("/businesslogic/<int:id>", methods=("PUT",))
def update(id):
    """Update a record"""
    data = request.json
    error = None

    if not data:
        error = "data is required."

    if error is not None:
        flash(error)
    else:
        for col in jsonColumns:
            data[col] = json.dumps(data[col])
        id = model.update(id, data)
    return jsonify(id)

        









