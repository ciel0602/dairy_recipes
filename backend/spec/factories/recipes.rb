FactoryBot.define do
  factory :recipe do
    user { nil }
    title { "MyString" }
    description { "MyText" }
    current_ingredients { "" }
    current_steps { "" }
    current_rating { 1 }
    current_version_id { 1 }
  end
end
