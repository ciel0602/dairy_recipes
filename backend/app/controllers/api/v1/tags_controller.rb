class Api::V1::TagsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    tags = current_user.tags.all
    render json:
      tags.map { |tag|
    {
      id: tag.id,
      name: tag.name
    }
  }
  end
end
