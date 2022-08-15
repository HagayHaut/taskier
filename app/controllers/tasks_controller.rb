class TasksController < ApplicationController
  skip_before_action :authorize

  def index
    user = User.find(params[:user_id])
    render json: user.tasks, status: :ok
  end

  def create
    task = Task.create!(task_params)
    render json: task, status: :created
  end

  private

  def task_params
    params.permit(:description, :due_by, :category_id, :user_id, :reminder, :completed)
  end
end
