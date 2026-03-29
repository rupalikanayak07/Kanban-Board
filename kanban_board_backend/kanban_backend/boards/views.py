from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import * 
from .serializer import *
from rest_framework import status
from django.db.models import Q

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_board(request):
    data = request.data
    data['owner'] = request.user.id         # assign logged-in user as owner

    serializer = BoardSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_boards(request):
    user = request.user

    boards = Board.objects.filter( Q(owner=user) | Q(members=user)
    ).distinct()
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def board_data(request, board_id):
    board = Board.objects.get(id=board_id)
    lists = List.objects.filter(board=board)

    list_data = []

    for l in lists:
        tasks = Task.objects.filter(list=l)

        list_data.append({
            "id": l.id,
            "title": l.title,
            "tasks": TaskSerializer(tasks, many=True).data
        })

    return Response({
        "id": board.id,
        "name": board.name,   
        "members": [          
            {
                "id": user.id,
                "username": user.username
            }
            for user in board.members.all()
        ],
        "lists": list_data    
    })

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_list(request):
    data = request.data
    try:
        board = Board.objects.get(id=data.get('board'), owner=request.user)
    except Board.DoesNotExist:
        return Response({"error": "Board not found or not yours"})

    serializer = ListSerializer(data=data)
    if serializer.is_valid():
        serializer.save(board=board)
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lists(request, board_id):
    try:
        board = Board.objects.get(id=board_id, owner=request.user)
    except Board.DoesNotExist:
        return Response({"error": "Board not found"})

    lists = List.objects.filter(board=board).order_by('position')
    serializer = ListSerializer(lists, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    data = request.data

    try:
        list_obj = List.objects.get(id=data.get('list'), board__owner=request.user)
    except List.DoesNotExist:
        return Response({"error": "List not found"})

    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request, list_id):
    try:
        list_item = List.objects.get(id=list_id, board__owner=request.user)
    except List.DoesNotExist:
        return Response({"error": "List not found"})

    tasks = Task.objects.filter(list=list_item).order_by('position')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_task(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)

    serializer = TaskSerializer(task, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id, list__board__owner=request.user)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"})

    task.delete()
    return Response({"message": "Task deleted"})




@api_view(["POST"])
def invite_user(request, board_id):
    username = request.data.get("username")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    try:
        board = Board.objects.get(id=board_id)
    except Board.DoesNotExist:
        return Response({"error": "Board not found"}, status=404)

    board.members.add(user)

    return Response({"message": "User added successfully"})