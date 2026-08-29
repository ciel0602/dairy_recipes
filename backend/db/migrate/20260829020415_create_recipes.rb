class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title ,null: false
      t.text :description
      t.json :current_ingredients
      t.json :current_steps
      t.integer :current_rating, null:false, default:0
      t.integer :current_version_id

      t.timestamps
    end
  end
end
