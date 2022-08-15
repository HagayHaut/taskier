class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_by, :category, :user_id, :reminder, :completed, :date_format

  def category
    object.category.name
  end

  def date_format
    object.due_by.strftime("%a, %b %-d %Y")
  end
end
