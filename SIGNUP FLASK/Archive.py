import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =  environ.get('dbURL')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://ESDT4@host.docker.internal:3306/profile'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/profile'

# For Deployment:
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://bee21b1837f0c3:e0021dda@us-cdbr-east-05.cleardb.net:3306/heroku_7e762db5c043985'
# mysql://bee21b1837f0c3:e0021dda@us-cdbr-east-05.cleardb.net/heroku_7e762db5c043985?reconnect=true
# The SQLAlchemy Database URI format is: dialect+driver://username:password@host:port/database

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Profile(db.Model):
    __tablename__ = "profile_details"

    user_id = db.Column(db.String(64), primary_key=True)
    name = db.Column(db.String(64), nullable = False)
    email = db.Column(db.String(64), nullable=False)
    mobile = db.Column(db.String(8), nullable=False)
    ratings = db.Column(db.Float(precision=2), nullable = True)
    counts = db.Column(db.Float(precision=3),nullable=True)

    def __init__(self,user_id,name,email,mobile,ratings,counts):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.mobile = mobile
        self.ratings = ratings
        self.counts = counts

    def json(self):
        return {"user_id": self.user_id, "name": self.name, "email": self.email, "mobile": self.mobile,"ratings":self.ratings}
        

# We need to get /profile/:id, this is to get the profile details of the user 
@app.route("/profile/<string:profile_ID>")
def find_by_profile_ID(profile_ID):
    profile = Profile.query.filter_by(user_id=profile_ID).first()
    if profile:
        return jsonify({
            "code":200,
            "data": profile.json()
        }),200
    return jsonify({
        "code":404,
        "message": "User has yet to register"
    }),404

# We need to update profile/ratings/:id, this is to update the profile ratings of the user
# INPUT JSON: current input rating given by buyer to seller
# {"ratings": 5
# New User ratings will be 0 and count will be 0. 
@app.route("/profile/ratings/<string:Profile_Id>", methods=["PUT"])
def update_ratings(Profile_Id):
    profile = Profile.query.filter_by(user_id=Profile_Id).first()
    if profile:
        data = request.get_json() 
        input_ratings = data['ratings']

        aggregated_count = profile.counts
        new_count = profile.counts + 1
        profile.counts = new_count

        database_ratings = profile.ratings

        temp_formula = ((aggregated_count * database_ratings) + input_ratings)/ new_count

        profile.ratings = round(temp_formula, 2)
        db.session.commit()

        return jsonify(
            {
                "code":200,
                "data":profile.json(),
                "message":"Profile's ratings has been updated."
            }
        ),200

    return jsonify(
        {
            "code": 404,
            "data": {
                "User": Profile_Id
            },
            "message": "Error while updating profile ratings. User profile does not exist."
        }
    ), 404
        

# We need to update mobile number in profile (required step) 
@app.route("/profile/mobile/<string:Profile_Id>", methods=["PUT"])
def update_number(Profile_Id):
    if (Profile.query.filter_by(user_id=Profile_Id).first()):

        data = request.get_json()
        profile = Profile.query.filter_by(user_id=Profile_Id).first()
        print(profile.mobile)
        profile.mobile = data['mobile']
        db.session.commit()
        return jsonify({
                "code":200,
                "data":profile.json(),
                "message":"Profile's number has been updated."
            }
        ),200
    
    return jsonify({
        "code":404,
        "message":"An error occured while updating the profile number.Please try again."
    }), 404



# We need to post /profile/register/, this is to register new user everytime they login with google 
@app.route("/profile/register/<string:Profile_Id>", methods=["POST"])
def create_account(Profile_Id):
    if (Profile.query.filter_by(user_id=Profile_Id).first()):
        return jsonify({
            "code":400,
            "data": {
                "user_id" : Profile_Id
            },
            "message": "User has already registered"
        }), 400
    
    data = request.get_json()
    profile = Profile(Profile_Id, **data)

    try:
        db.session.add(profile)
        db.session.commit()
    
    except:
        return jsonify({
            "code":500,
            "data":{
                "user_id": Profile_Id
            },
            "message": "An error occured creating a new account"
        }), 500
    
    return jsonify({
        "code":200,
        "data":profile.json()
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True) 