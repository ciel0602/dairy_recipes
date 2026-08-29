class Api::V1::RecipesController <  Api::V1::BaseController
  def show
    recipes = Recipe.all
    render json: recipes
  end
end
