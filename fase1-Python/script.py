import tweepy
import preprocessor as p
import emoji
from geopy.geocoders import Nominatim
p.set_options(p.OPT.URL, p.OPT.EMOJI, p.OPT.SMILEY)

def get_coord(zona):
    geolocator = Nominatim(user_agent="Sentimientos Uber-Cabify")
    geo = geolocator.geocode(zona)
    return (geo.latitude, geo.longitude)


def remove_emoji(text):
    return emoji.get_emoji_regexp().sub(r'', text)

consumer_key = 'SzaxB5ndFyLPlDULWTjpalsRR'
consumer_secret = 'E4F2GzYB7QNHRFoq1WPzYSDyqShjHo4Xm5sniDll60yZo5XzZD'
access_token  = '1159586127512317952-KnrBcec1geGVS9faGpQMAFJ4lXW1q7'
access_token_secret = 'GKeHXjDXQRWERGR5N3w0QrNBtj2vXWOu3wYgNSnu6a6E0'
auth = tweepy.OAuthHandler(consumer_key,  consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)


def get_tweets(datos,zona):
    tweets = tweepy.Cursor(api.search, q=datos[1], geocode=str(zona[0])+","+str(zona[1])+","+str(datos[3]), lang ="es",tweet_mode='extended').items(300)
    with open(datos[0], 'w+') as f:
        for tweet in tweets:
            status = api.get_status(tweet.id,tweet_mode="extended")
            try:
                f.write(remove_emoji(p.clean(status.retweeted_status.full_text))+"\n")
            
            except AttributeError:
                f.write(remove_emoji(p.clean(status.full_text))+"\n")
        f.close()


def init():
    file=open("config/config.csv")
    file.readline().strip()

    for i in file:
        lista=i.strip().split(',')
        get_tweets(lista,get_coord(lista[2]))

init()