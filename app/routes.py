from flask import Flask, redirect, render_template, request, jsonify
from flask_mail import *
from app import app
from random import *
from validate_email_address import validate_email
import datetime
import dynamodb_handler
from flask_cors import CORS, cross_origin
from flask_session import Session


app = Flask(__name__)
app.config["MAIL_SERVER"]='smtp.gmail.com'
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = 'cathack.notification@gmail.com'
app.config['MAIL_PASSWORD'] = 'wjbdsvjkndsntrkw'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['CORS_HEADERS'] = 'Content-Type'


mail = Mail(app)
otp = randint(100000,999999)
server_session = Session(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/v1/users")
def list_users():
  return "user example"

@app.route('/index', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def index():
    if 'otp' in request.form:
        userOtp = request.form['otp']
        if int(userOtp) == otp:
            now = datetime.datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            dynamodb_handler.updatelog(mail, date_time)
            return jsonify({
                'status': 'authenticated'
            })
        else:
            return jsonify({
                'status': 'wrong_otp'
            })
    if 'email' in request.form:
        userEmail = request.form['email']
        if validate_email(userEmail, verify=True):
            msg = Message('OTP',sender = 'username@gmail.com', recipients = [request.form['email']])
            msg.body = str(otp)
            mail.send(msg)
            return jsonify({
                'status': 'requested_otp'
            })
        else:
            return jsonify({
                'status': 'invalid_email'
            })
    else:
        return jsonify({
            'status': 'requested_email'
        })

@app.route('/dash', methods=['POST'])
def dashboard():
    return jsonify({})