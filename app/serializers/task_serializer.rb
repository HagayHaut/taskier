class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_by, :category_id, :user_id, :reminder, :completed
end
