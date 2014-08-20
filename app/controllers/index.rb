get '/' do 
  redirect '/cesium'
end

get '/cesium' do 
  erb :cesium
end


# Ping Yelp API and get Json back.
get '/search/yelp' do 
  erb :yelp_request
end

get '/search/yelp/request' do 
  api = Yelp::Api.new
  latitude = params[:latitude]
  longitude = params[:longitude]
  @json_response = api.search_restaurants(latitude, longitude)
  erb :yelp_response
end