class Recipe < ApplicationRecord
  belongs_to :user
  has_one_attached :thumbnail

  has_many :tag_relationships, dependent: :destroy
  has_many :tags, through: :tag_relationships
  has_many :meal_plans, dependent: :destroy

  validates :title, presence: true
end
