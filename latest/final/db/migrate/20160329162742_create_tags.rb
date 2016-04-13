class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.belongs_to :creator, index: true
      
      t.timestamps null: false
    end
  end
end
