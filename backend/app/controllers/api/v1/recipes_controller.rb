class Api::V1::RecipesController <  Api::V1::BaseController
  def index
    recipes = Recipe.all
    render json: 
      recipes.map { |recipe|
      {
        id:recipe.id,
        title: recipe.title,
        description:recipe.description,
        thumbnail_url: recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
        current_rating:recipe.current_rating,
        created_at:recipe.created_at      
      }
    }
  end
end
