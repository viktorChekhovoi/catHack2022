from validate_email_address import validate_email

def checkEmail(email: str):
    return validate_email(email, verify=True)