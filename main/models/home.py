from ..db import get_db


def list():
    """List inputs."""
    db = get_db()
    inputs = (
        get_db()
        .execute(
            "SELECT i.id, i.input, i.created"
            " FROM input i"
            " ORDER BY created DESC"
        )
        .fetchall()
    )
    return inputs


def insert(input):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO input (input) VALUES (?)",
        (input,),
    )
    db.commit()
    return cursor.lastrowid


def delete(id):
    db = get_db()
    db.execute(
        "DELETE FROM input WHERE id = ?",
        (id,),
    )
    db.commit()
