
=============
Install
=============

Create a venv folder under sample_flask_app.
$ python3 -m venv venv

To activate the virtual enviroment, run the command below.
$ . venv/bin/activate

Install flask:
$ pip install flask


=============
Run
=============

$ export FLASK_APP=main
$ export FLASK_ENV=development
$ flask init-db
$ flask run


=============
Test
=============

Install pytest
$ pip install pytest

So that we can import the module flaskr correctly, we need to run pip install -e . in the folder sample_flask_app.
    $ pip install -e .

Run test:
    $ pip install '.[test]'
    $ venv/bin/pytest


==============
TODO: configure coverage report
==============
Run with coverage report::

    $ coverage run -m pytest
    $ coverage report
    $ coverage html  # open htmlcov/index.html in a browser


References:
https://flask.palletsprojects.com/en/2.0.x/installation/
https://flask.palletsprojects.com/en/2.0.x/quickstart/
https://flask.palletsprojects.com/en/2.0.x/tutorial/


