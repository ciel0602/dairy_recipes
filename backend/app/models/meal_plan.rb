class MealPlan < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  enum :status, {
    planned: "planned",
    completed: "completed"
  }

  validates :planned_date, presence: true
end
