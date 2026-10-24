FactoryBot.define do
  factory :meal_plan do
    user { nil }
    recipe { nil }
    planned_date { "2026-10-24" }
    status { "MyString" }
  end
end
