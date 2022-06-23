from boto3 import client, resource
from decouple import config

AWS_ACCESS_KEY_ID     = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
REGION_NAME           = config("REGION_NAME")

client = client(
    'dynamodb',
    aws_access_key_id     = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
    region_name           = REGION_NAME
)

resource = resource(
    'dynamodb',
    aws_access_key_id     = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
    region_name           = REGION_NAME
)

UserTable = resource.Table('user-table')

def addUser(email, company, password, role):

    response = UserTable.put_item(
        Item = {
            'email'     : email,
            'company'  : company,
            'password' : password,
            'role'  : role
        }
    )

    return response

def GetUser(email):

    response = UserTable.get_item(
        Key = {
            'email'     : email
        },
        AttributesToGet=[
            'email', 'company', 'role' # valemail types dont throw error, 
                              # Other types should be converted to python type before sending as json response
        ]
    )

    return response

def UpdateUserPassword(email, password):

    response = UserTable.update_item(
        Key = {
            'email': email
        },
        AttributeUpdates={
            'password': {
                'Value'  : password,
                'Action' : 'PUT' # available options -> DELETE(delete), PUT(set), ADD(increment)
            }
        },
        ReturnValues = "UPDATED_NEW"  # returns the new updated values
    )
    return response

def UpdateUserRole(email, role):

    response = UserTable.update_item(
        Key = {
            'email': email
        },
        AttributeUpdates={
            'role': {
                'Value'  : role,
                'Action' : 'PUT'
            }
        },
        ReturnValues = "UPDATED_NEW"
    )
    return response

# def ModifyAuthorforBook(email, author):

#     response = UserTable.update_item(
#         Key = {
#             'email': email
#         },
#         UpdateExpression = 'SET info.author = :new_author', #set author to new value
#         #ConditionExpression = '', # execute until this condition fails # no condition
#         ExpressionAttributeValues = { # Value for the variables used in the above expressions
#             ':new_author': author
#         },
#         ReturnValues = "UPDATED_NEW"  #what to return
#     )
#     return response

def DeleteUser(email):

    response = UserTable.delete_item(
        Key = {
            'email': email
        }
    )

    return response
