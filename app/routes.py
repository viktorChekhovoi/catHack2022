from flask import render_template, request
from flask_mail import *
from app import app
from random import *

EMAIL_PATTERN = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
@app.route('/')
@app.route('/index', methods=['POST'])
def index():
    otp = randint(0,999999)   
    if 'otp' in request.form:
        user_otp = request.form['otp']
        if user_otp == otp:
            return render_template('dashboard.html')
        else:
            return render_template('index.html', pattern=EMAIL_PATTERN, status = 'wrong otp')
    if 'email' in request.form:
        return render_template('index.html', pattern=EMAIL_PATTERN, status = 'email received')
    else:
        return render_template('index.html', pattern=EMAIL_PATTERN, status = 'waiting for email')


