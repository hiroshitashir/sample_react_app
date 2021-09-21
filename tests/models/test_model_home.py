import pytest

from main.db import get_db
from main.models import home as model


def test_insert_list(app):
    with app.app_context():
        model.insert("insert test one")
        results = model.list()
    
    assert results[0]['input'] == "insert test one"

def test_delete_list(app):
    with app.app_context():
        results = model.list()
        initialCount = len(results)
        model.delete(results[0]['id'])
        results = model.list()
    
    assert len(results) == initialCount-1
    
