ApiWarden.configure do |config|
  config.redis = {
    host: 'localhost',
    port: 6379,
    size: 8
  }
end

ApiWarden.ward_by('users', {
  expire_time_for_access_token: 5.minutes.seconds,
  expire_time_for_refresh_token: 2.days.seconds
})
