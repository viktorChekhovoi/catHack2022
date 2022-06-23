from flask import Flask
from flask_mail import *

app = Flask(__name__)


from app import routes