import tweepy

consumer_key = 'SzaxB5ndFyLPlDULWTjpalsRR'
consumer_secret = 'E4F2GzYB7QNHRFoq1WPzYSDyqShjHo4Xm5sniDll60yZo5XzZD'

access_token  = '1159586127512317952-KnrBcec1geGVS9faGpQMAFJ4lXW1q7'
access_token_secret = 'GKeHXjDXQRWERGR5N3w0QrNBtj2vXWOu3wYgNSnu6a6E0'
mex = '19.4357068,-99.131757,500km'
auth = tweepy.OAuthHandler(consumer_key,  consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

tweets = tweepy.Cursor(api.search, q="cabify", lang ="es", geocode = mex,tweet_mode='extended').items(4)


with open('tweets.csv', 'a') as f:
    f.write("tweets,app\n")
    cont = "uber" 
    for tweet in tweets:
        f.write(tweet.full_text+"\n")
        
    f.close()