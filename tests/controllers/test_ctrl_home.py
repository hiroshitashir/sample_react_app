import pytest

from main.db import get_db
from main.controllers import home as controller


def test_index(client):
    response = client.get("/")
    assert b"Inputs" in response.data
    assert b"Enter input" in response.data


def test_create(client, app):
    assert client.get("/").status_code == 200
    response = client.post("/", data={"input": "xxx yyy zzz",})

    with app.app_context():
        db = get_db()
        count = db.execute("SELECT COUNT(id) FROM input").fetchone()[0]
        assert count == 2

    assert b"Xxx yyy: 1" in response.data
    assert b"Yyy zzz: 1" in response.data


def test_invalid_create(client, app):
    assert client.get("/").status_code == 200
    response = client.post("/", data={"input": "test input1",})

    assert b"Input should only contain English characters, space, and punctuation like commas, periods, question marks, and semicolons." in response.data

    with app.app_context():
        db = get_db()
        count = db.execute("SELECT COUNT(id) FROM input").fetchone()[0]
        assert count == 1


def test_validate_input():
    assert controller.validate_input("**") == False
    assert controller.validate_input("123") == False
    assert controller.validate_input("...") == True
    assert controller.validate_input("abc;.?") == True
    assert controller.validate_input("abc:") == False


def test_applyFunc():
    output = controller.applyFunc("xxx yyy xxx")
    assert output["Xxx yyy"] == 2

    output = controller.applyFunc("xx.x y?yy xxx yy?")
    assert output["X y"] == 1
    assert output["Xxx yy"] == 2