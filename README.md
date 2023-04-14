# Part 2) How the voice assitant can get the configuration (business logic) of the stores?

- Since the configuration is store through the API layer, the voice assistant can also access the configuration through the API layer. 

GET requests to <api layer url>:businesslogic/<id> return the confiration. Please check apiserver/main/controllers/businessLogic.py for the details.


# Part 3) Safegard for accidentally changing the configuration

- In our frontend app (webbapp), UI shows the change when a user modifies the configuration. It also shows undo buttons, which reverse the change.

Please check webapp/src/BusinessLogic/BusinessLogic.js and webapp/src/components/UndoLabel.js.


# Part 4) How to run the configuration portal

- apiserver: 
Please read apiserver/README.txt

- webapp: 
To install npm libraries
$ cd webapp/
$ npm install 

To run the app (http://localhost:3000)
$ npm start

For more information, please read webapp/README.txt



# TODO:
apiserver
- Add tests 
- Make separate tables for toppings and pizzaSizes

webapp
- Add tests
- Add route logic
- Add status update after create or update 
- Move some of the logic to a common utility library
- I used react/bootstrap for UI. In components/CheckboxRadioForm.js, Form.Check is converted to a plain <input> tag and the tag is missing 'value' field. As a result, I passed the value through id field. Find a better way to pass the value.


