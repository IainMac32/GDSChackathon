from flask import Flask, request, jsonify, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# ROUTES 

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

@app.route("/api/submit", methods=['POST', 'GET', 'OPTIONS'])
def submit_data():
    input_data = request.json.get('inputValues')
    print("####################")
    print(input_data)
    print("####################")

    return {"response": "POST REQUEST RECEIVED"}

@app.route("/api/submit_title", methods=['POST', 'GET', 'OPTIONS'])
def submit_title():
    input_data = request.json.get('inputValue')
    print("$$$$$$$$$$$$$$$$")
    print(input_data)
    print("$$$$$$$$$$$$$$$$")

    return {"response": "POST REQUEST RECEIVED"}


@app.route("/api/submit_description", methods=['POST', 'GET', 'OPTIONS'])
def submit_description():
    input_data = request.json.get('descriptionValue')
    print("!!!!!!!!!!!!!!!!")
    print(input_data)
    print("!!!!!!!!!!!!!!!!")

    return {"response": "POST REQUEST RECEIVED"}


@app.route("/api/get_title", methods=['GET'])
def get_info():
    return {"response": ["Title from flask!"]}


@app.route("/api/get_slides", methods=['GET'])
def get_slides():
    return {"response": ["Slide 1 Test", "Slide 2 Test", "Slide 3 Test"]}


if __name__ == '__main__':
    app.run(debug=True)