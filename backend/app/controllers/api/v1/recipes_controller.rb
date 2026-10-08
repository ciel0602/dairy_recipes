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
    render json: {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
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

  private
  def recipe_params
    params.require(:recipe).permit(
      :title,
      :description,
      :rating,
      ingredients: [ :name, :amount, :unit ],
      steps: [ :step, :description ],
    )
  end
end
