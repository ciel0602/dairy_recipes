class Api::V1::RecipesController <  Api::V1::BaseController
  def index
    recipes = Recipe.all
    render json:
      recipes.map { |recipe|
      {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        thumbnail_url: recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
        current_rating: recipe.current_rating,
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
      current_ingredients: recipe.current_ingredients,
      current_steps:recipe.current_steps,
      thumbnail_url: recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
      current_rating: recipe.current_rating,
      current_version_id:recipe.current_version_id,
      created_at: recipe.created_at
    }
  end
end
