class Api::UsersController < ActionController::API
  before_action :ward_by_user!, except: [:sign_in, :refresh_token]

  def sign_in
    if params[:username] == 'foo' && params[:password] = '123456'
      user_id = 1
      render json: {
        user_id: user_id,
        access_token: generate_access_token_for_user(user_id)
      }
    else
      render json: { err_msg: 'authentication failed' }
    end
  end
end
