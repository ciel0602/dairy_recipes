class Api::V1::RecipesController <  Api::V1::BaseController
before_action :authenticate_user!

  def index
    recipes = current_user.recipes.all
    render json:
      recipes.map { |recipe|
      {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        thumbnail_url: recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
        rating: recipe.rating,
        created_at: recipe.created_at
      }
    }
  end

  def show
    recipe = Recipe.find(params[:id])
    tags = recipe.tags.map do |tag|
      {
        id: tag.id,
        name: tag.name
      }
    end
    render json: {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      tags: tags,
      amount_ratio: recipe.amount_ratio,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      thumbnail_url: recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
      rating: recipe.rating,
      version_id: recipe.version_id,
      created_at: recipe.created_at
    }
  end

  def create
    recipe = current_user.recipes.build(recipe_params)

    if recipe.save
      # Rails.logger.debug("params: #{params.to_unsafe_h.inspect}")
      # Rails.logger.debug("recipe params: #{params[:recipe].inspect}")
      # Rails.logger.debug("recipe_params: #{recipe_params.to_h.inspect}")
      recipe.tags = Tag.where(
        id: recipe_params[:tag_ids],
        user_id: current_user.id
      )
      render json: {
        message: "レシピを登録しました。",
        recipe: recipe
      },
      status: :created
    else
      render json {
        message :"レシピ登録に失敗しました。",
        errors: recipe.errors.full_messages,
        status: :unprocessable_content
      }
    end
  end

  def destroy
    recipe  = current_user.recipes.find(params[:id])

    recipe.destroy!
  end

  private
  def recipe_params
    params.require(:recipe).permit(
      :title,
      :description,
      :rating,
      :amount_ratio,
      tag_ids: [],
      ingredients: [ :name, :amount, :unit ],
      steps: [ :step, :description ],
    )
  end
end
