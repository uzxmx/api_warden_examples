ApiWarden.configure do |config|
  config.redis = {
    host: 'localhost',
    port: 6379,
    size: 8
  }
end

ApiWarden.ward_by('users', {
  disable_refresh_token: true,
  expire_time_for_access_token: 30.seconds,
  on_authenticate_success: proc { |authentication|
    if (ttl = authentication.ttl_for_access_token) < 15.seconds
      authentication.ttl_for_access_token = 30.seconds
    end
  }
})
