from collections import Counter
import re

from flask import Blueprint
from flask import current_app
from flask import flash
from flask import redirect
from flask import render_template
from flask import request
from flask import url_for

from ..models import home as model


bp = Blueprint("home", __name__)


@bp.route("/", methods=("GET", "POST"))
def index():
    """Store input to db"""
    id = None
    
    if request.method == "POST":
        input = request.form["input"]
        error = None

        if not input:
            error = "Input is required."
        elif not validate_input(input):
            error = "Input should only contain English characters, space, and punctuation like commas, periods, question marks, and semicolons."

        if error is not None:
            flash(error)
        else:
            id = model.insert(input)
    elif request.method == "GET":
        id = request.args.get('id')
    
    if id:
        try:
            id = int(id)
        except:
            current_app.logger.warning('Failed to cast id %s to int' % id)
    
    """Show all the inputs, most recent first."""
    inputs = model.list()
    
    result = None
    for eachInput in inputs:
        if id and id == eachInput['id']:
            result = applyFunc(eachInput['input'])
    return render_template("home/index.html", inputs=inputs, result=result)


def validate_input(input):
    """input should only contain English characters, space, and punctuation like commas, periods, question marks, and semicolons.
    """
    if re.search(r"[^(a-z|A-Z|\s|,|.|?|;)]", input):
      return False
    return True


def applyFunc(input):
    counter = Counter()

    prevWord = None 
    for eachWordSpace in input.lower().split():
        eachWordRest = re.split(r"[,.?;]", eachWordSpace)
        if prevWord and len(eachWordRest) > 0:
            key = " ".join(sorted([prevWord, eachWordRest[0]]))
            key = "%s%s" % (key[0].upper(), key[1:])
            counter[key] += 1
        prevWord = eachWordRest[-1]

    return counter


@bp.route("/<int:id>/delete", methods=("POST",))
def delete(id):
    model.delete(id)

    return redirect(url_for("home.index"))




