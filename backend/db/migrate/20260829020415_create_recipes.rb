class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.json :ingredients
      t.json :steps
      t.integer :rating
      t.integer :version_id

      t.timestamps
    end
  end
end
