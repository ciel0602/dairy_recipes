class Tag < ApplicationRecord
  belongs_to :user
  
  has_many :tag_relationships, dependent: :destroy
  has_many :recipes ,through: :tag_relationship

  validates :name, presence: true
end
