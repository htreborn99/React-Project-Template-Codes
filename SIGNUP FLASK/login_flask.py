import email
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/template_code_login'
# The SQLAlchemy Database URI format is: dialect+driver://username:password@host:port/database


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Login(db.Model):
    __tablename__ = "template_code_login"

    login = db.Column(db.String(13), primary_key=True)
    password = db.Column(db.String(64), nullable = False)
    fullname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable = False)

    def __init__(self,login,password,email,fullname):
        self.login = login
        self.password = password
        self.email = email
        self.fullname = fullname

    def json(self):
        return {"login": self.login, "password": self.password,"email": self.email , "fullname": self.fullname}

# This is to register if there is such a account 
@app.route("/signup/<string:loginID>", methods = ['POST'])
def signup(loginID):
    exist_account = Login.query.filter_by(login=loginID).first()
    if exist_account:
        return jsonify({
            "code":404,
            "message": "Account already exist, registering failed."
        }),404
    
    data = request.get_json()
    print(data)
    loginid = data['login']
    password = data['password']
    email = data['email']
    fullname = data['fullname']
    heehaw = Login(loginid,password, email,fullname)

    try:
        print("adding")
        db.session.add(heehaw)
        db.session.commit()
    
    except:
        print("Hello")
        return jsonify({
            "code": 500,
            "data": {
                "loginID" : loginID
            },
            "message": "An error occured creating a new account"
        })
    print("registered")
    return jsonify({
        "code":200,
        "message": "Acccount has been successfully registered"
    })

# This is to check the if the password is correct with the server side. 
@app.route("/login/<string:loginID>",methods=["POST"])
def signin(loginID):
    if not Login.query.filter_by(login=loginID).first():
        return jsonify({
            "code":404,
            "message":"There is no such account, you have to log in first."
        })
    else:
        # Getting the Data from user request
        data = request.get_json()
        user_password = data['password']

        # Getting the Data from server side
        server_side = Login.query.filter_by(login=loginID).first().json()
        server_password = server_side['password']

        if server_password == user_password:
            
            return jsonify({
                "code": 200,
                "Message" : "Login is successful",
                "data": server_side
            })
        else:
            return jsonify({
                "code":404,
                "Message": "Password is wrong."
            })


if __name__ == "__main__":
    app.run(port=5000,debug=True)