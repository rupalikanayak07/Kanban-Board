from django.urls import path
from .views import *

urlpatterns=[
    path('boards/', create_board),
    path('boards/list/', get_boards),
    path('board-data/<int:board_id>/', board_data),
    
    path('lists/', create_list),
    path('lists/<int:board_id>/', get_lists),

    path('tasks/', create_task),
    path('tasks/<int:list_id>/', get_tasks),
    path('tasks/update/<int:pk>/', update_task),
    path('tasks/delete/<int:task_id>/', delete_task),

    path("boards/<int:board_id>/invite/", invite_user),
]