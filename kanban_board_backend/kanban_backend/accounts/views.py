from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# Create your views here.
@api_view(['POST'])
def register(request):
    serializer_data = RegisterSerializer(data=request.data)
    if serializer_data.is_valid():
        serializer_data.save()
        return Response({
            'message': 'User registered successfully',
            'data': serializer_data.data
        })

    return Response(serializer_data.errors)
    
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate user
    user = authenticate(username=username, password=password)

    if user is not None:
        # Generate jwt tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            'message': 'Login successful',
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
    else:
        return Response({
            'error': 'Invalid credentials'
        }, status=400)