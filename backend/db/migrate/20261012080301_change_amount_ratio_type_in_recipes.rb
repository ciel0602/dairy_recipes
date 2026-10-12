class ChangeAmountRatioTypeInRecipes < ActiveRecord::Migration[8.1]
  def change
    change_column :recipes, :amount_ratio, :integer,
                  precision: 4,
                  scale: 1,
                  default: 2,
                  null: false
  end
end
