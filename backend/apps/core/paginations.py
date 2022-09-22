from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

class LimitOffsetPaginationExtended(LimitOffsetPagination):
    ordering = 'created_at'

    def get_paginated_response(self, data):
        return Response({
            'total': self.count,
            'limit': self.limit,
            'offset': self.offset,
            'results': data
        })