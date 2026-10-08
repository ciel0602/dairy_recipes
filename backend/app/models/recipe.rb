class Recipe < ApplicationRecord
  belongs_to :user
  has_one_attached :thumbnail

  has_many :tag_relationships, dependent: :destroy
  has_many :tags, through: :tag_relationships

  validates :title, presence: true
end
