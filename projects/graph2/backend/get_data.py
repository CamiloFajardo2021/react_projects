from flask import Flask, jsonify,request
from flask_cors import CORS
from data_function import *

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

@app.route('/api/data', methods=['GET'])
@app.route('/api/data', methods=['POST'])
def get_data():
    content = request.get_json()
    name = content.get('name', 'Guest')
    names,edades = filter_d(name)
    data = to_json(call_network(name))
    
    #data = {
    #    'message': f'Hello, {names[0]}!',
    #    'value': edades[0]
    #}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

