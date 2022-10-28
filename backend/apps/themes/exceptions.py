from rest_framework.exceptions import APIException


class StatusAlreadyChanged(APIException):
    status_code = 400
    default_detail = {"error_code": "status_already_changed", "detail": "Status already changed"}
