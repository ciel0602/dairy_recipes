# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :recipes, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :meal_plans, dependent: :destroy

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
end
