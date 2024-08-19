import json
import pickle
import numpy as np

# Create global variables
__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, area, floor, room):
    try:
        loc_index = __data_columns.index(location.lower)
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = floor
    x[2] = room

    if (loc_index) >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)


def load_saved_artifacts():
    print("Loading saved artifacts...")
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        # first 3 columns are  area, floor and room
        __locations = __data_columns[3:]

    with open("./artifacts/real_estate_price_prediction.pickle", 'rb') as f:
        __model = pickle.load(f)

    print("Loaded model successfully...")


def get_locations():
    return __locations


def get_data_columns():
    return __data_columns


if __name__ == "__main__":
    load_saved_artifacts()
    print(get_locations())
    # print(get_estimated_price('Sitapaila Kathmandu', 1711.25, 3, 12))