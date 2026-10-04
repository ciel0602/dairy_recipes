class Recipe < ApplicationRecord
  belongs_to :user
  has_one_attached :thumbnail

  validates :title, presence: true
end
