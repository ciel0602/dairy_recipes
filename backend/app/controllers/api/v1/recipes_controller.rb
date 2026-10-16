class Api::V1::RecipesController <  Api::V1::BaseController
before_action :authenticate_user!

  def index
    # recipes = current_user.recipes.all
    # render json:
    #   recipes.map { |recipe|
    #   {
    #     id: recipe.id,
    #     title: recipe.title,
    #     description: recipe.description,
    #     thumbnail_url: recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
    #     rating: recipe.rating,
    #     created_at: recipe.created_at
    #   }
    # }
    recipes = current_user.recipes
    if params[:q].present?
      keyword = "%#{Recipe.sanitize_sql_like(params[:q])}%"
      recipes = recipes.where(
        "title LIKE :keyword",
        keyword: keyword)
    end
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
      render json: {
        errors: recipe.errors.full_messages,
        status: :unprocessable_content
      }
    end
  end

  def update
    recipe = current_user.recipes.find(params[:id])

    if recipe.update(recipe_params)
      render json: {
        message: "レシピを編集しました。",
        recipe: recipe
      },
      status: :ok
    else
      render json: {
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
