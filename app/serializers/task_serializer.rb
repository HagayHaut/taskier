class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_by, :category, :user_id, :reminder, :completed

  def category
    object.category.name
  end
end
