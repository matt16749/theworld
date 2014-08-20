require_relative '../models/yelp_api'

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
  search_city = params[:city]
  api = Yelp::Api.new
  @what = api.search_food(search_city)
  erb :yelp_response
end