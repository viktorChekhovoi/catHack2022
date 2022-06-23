# packages required: validate_email_address, py3dns

from validate_email_address import validate_email

def check_email(email: str):
    '''Checks whether entered email is valid or not syntactically and also whether it actually exists or not
            Parameters:
                    email (string): Input email
            Returns:
                    flag (boolean): Flag storing True or false value'''

    isExists = validate_email(email, verify=True)
    flag = True if isExists is True else False
    return flag