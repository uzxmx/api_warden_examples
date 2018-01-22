class Api::UsersController < ActionController::API
  before_action :ward_by_user!, except: [:sign_in, :refresh_token]

  def sign_in
    if params[:username] == 'foo' && params[:password] = '123456'
      user_id = 1
      access_token, refresh_token = generate_tokens_for_user(user_id)
      render json: {
        user_id: user_id,
        access_token: access_token,
        refresh_token: refresh_token
      }
    else
      render json: { err_msg: 'authentication failed' }
    end
  end

  def refresh_token
    if validate_refresh_token_for_user!
      user_id = current_user_authentication.id
      access_token, refresh_token = generate_tokens_for_user(user_id)
      render json: {
        user_id: user_id,
        access_token: access_token,
        refresh_token: refresh_token
      }
    end
  end
end
