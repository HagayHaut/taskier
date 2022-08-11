class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :description
      t.datetime :due_by
      t.integer :category_id
      t.integer :user_id
      t.boolean :reminder
      t.boolean :completed
    end
  end
end
