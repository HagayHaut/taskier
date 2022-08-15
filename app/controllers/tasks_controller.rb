class TasksController < ApplicationController
  skip_before_action :authorize

  def index
    user = User.find(params[:user_id])
    render json: user.tasks, status: :ok
  end

  def show
    render json: Task.find(params[:id]), status: :ok
  end

  def create
    task = Task.create!(task_params)
    render json: task, status: :created
  end

  def update
    task = Task.find(params[:id])
    task.update!(task_params)
    render json: task, status: :accepted
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content
  end

  private

  def task_params
    params.permit(:description, :due_by, :category_id, :user_id, :reminder, :completed)
  end
end
