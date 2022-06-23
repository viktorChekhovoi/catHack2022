from flask import redirect, render_template, request
from flask_mail import *
from app import app
from random import *


app.config["MAIL_SERVER"]='smtp.gmail.com'  
app.config["MAIL_PORT"] = 465      
app.config["MAIL_USERNAME"] = 'cathack.notification@gmail.com'
app.config['MAIL_PASSWORD'] = 'wjbdsvjkndsntrkw' 
app.config['MAIL_USE_TLS'] = False  
app.config['MAIL_USE_SSL'] = True  

mail = Mail(app)  
otp = randint(100000,999999)

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    if 'otp' in request.form:
        user_otp = request.form['otp']
        print('The OTP is: ', otp)
        print('User OTP is: ', user_otp)
        if int(user_otp) == otp:
            return render_template('data_access.html')
        else: return render_template('index.html', status = 'wrong otp')
    if 'email' in request.form:  
        msg = Message('OTP',sender = 'username@gmail.com', recipients = [request.form['email']])  
        msg.body = str(otp)  
        mail.send(msg)  
        print('The OTP is:', otp)
        return render_template('index.html', status = 'waiting for otp')
    else:
        return render_template('index.html', status = 'waiting for email')

@app.route('/dashboard', methods=['POST'])
def dashboard():
    return redirect('/index')


