from flask import Flask, request, jsonify
import utils
from flask_cors import CORS
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", methods=["GET"])
# Default Home Route
def default_home_route():
    response = jsonify({
        "success": True,
        "message": "Server is working correctly"

    })
    return response.json


@app.route("/get-locations", methods=["GET"])
# Route to Get Location Names
def get_locations():
    response = jsonify({
        'locations': utils.get_locations(), 'success': True
    })
    return response


@app.route("/predict", methods=["POST", "GET"])
# Route to predict price
def predict():
    area = float(request.form['area'])
    location = request.form['location']
    floor = float(request.form['floor'])
    room = float(request.form['room'])

    response = jsonify({
        "success": True,
        'estimated_price': utils.get_estimated_price(location, area, floor, room)
    })

    return response


if __name__ == "__main__":
    print('Server is running on port 5000')
    utils.load_saved_artifacts()
    app.run(debug=True)
