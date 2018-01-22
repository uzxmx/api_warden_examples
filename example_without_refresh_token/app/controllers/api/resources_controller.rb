class Api::ResourcesController < ActionController::API
  before_action :ward_by_user!
  
  def protected_resource
    render json: { msg: 'I\'m protected.' }
  end
end
