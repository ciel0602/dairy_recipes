class AddAmountRatioToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :amount_ratio, :decimal, precision: 4, scale: 1, default: 2.0, null: false
  end
end
