from ..db import get_db


def get(id):
    """List businessLogics."""
    db = get_db()
    row = (
        get_db()
        .execute(
            "SELECT id, storeName, toppings, pizzaSizes, flagDelivery, flagDeliveryMinimumFee, deliveryMinimumFee, waitTimeMinutesDelivery, waitTimeMinutesTakeout"
            " FROM businessLogic b"
            " WHERE id = ?",
            (id,),
        )
        .fetchone()
    )
    return row

def insert(input):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO businessLogic (storeName, toppings, pizzaSizes, flagDelivery, flagDeliveryMinimumFee, deliveryMinimumFee, waitTimeMinutesDelivery, waitTimeMinutesTakeout) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (input['storeName'], input['toppings'], input['pizzaSizes'], input['flagDelivery'], input['flagDeliveryMinimumFee'], input['deliveryMinimumFee'], input['waitTimeMinutesDelivery'], input['waitTimeMinutesTakeout'],),
    ) 
    
    db.commit()
    return cursor.lastrowid

def update(id, input):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "UPDATE businessLogic SET storeName = ?, toppings = ?, pizzaSizes = ?, flagDelivery = ?, flagDeliveryMinimumFee = ?, deliveryMinimumFee = ?, waitTimeMinutesDelivery = ?, waitTimeMinutesTakeout = ? WHERE id = ?",
        (input['storeName'], input['toppings'], input['pizzaSizes'], input['flagDelivery'], input['flagDeliveryMinimumFee'], input['deliveryMinimumFee'], input['waitTimeMinutesDelivery'], input['waitTimeMinutesTakeout'], id,),
    )
    db.commit()
    return cursor.lastrowid

