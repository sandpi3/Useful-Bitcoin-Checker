import pandas as pd
import sklearn
import numpy as np
import quandl
import datetime as dt
import quandl
import logging
import os
import time
from firebase import firebase
import firebase_admin
import os, sys
import json

# import cloudstorage as gcs
# import webapp2
# from google.appengine.api import app_identity

quandl.ApiConfig.api_key = "6s9GSsp_m385xDX9Rp9B"

def analyze_data():
    df_get1 = quandl.get('BCHARTS/BITSTAMPUSD', start_date=(dt.datetime.today() - dt.timedelta(days=5)), end_date=(dt.datetime.today() - dt.timedelta(days=5)))
    df_get2 = quandl.get('BCHARTS/BITSTAMPUSD', start_date=(dt.datetime.today() - dt.timedelta(days=1)), end_date=(dt.datetime.today() - dt.timedelta(days=1)))
    df1 = pd.DataFrame(df_get1)
    df2 = pd.DataFrame(df_get2)
    df2.reset_index(inplace=True)
    df1.reset_index(inplace=True)
    df1.drop(['High', 'Low', 'Weighted Price', 'Volume (Currency)', 'Date'], 1, inplace=True)
    df2.drop(['High', 'Low', 'Weighted Price', 'Volume (Currency)', 'Date'], 1, inplace=True)

    growth_data = (df2['Close'] / df1['Close'])
    percentage_growth = (growth_data * 100) - 100
    # print(percentage_growth)
    recommend = 'Unknown'
    with open("Output.txt", "w") as text_file:
        if percentage_growth[0] <= -2:
            recommend = 'Sell'
            reaction = "(No surprise there)"
            text_file.write(recommend + " | Growth: " + str(percentage_growth[0].round()))
        elif percentage_growth[0] >= 2:
            recommend = 'Buy'
            reaction = "(Surprising)"
            text_file.write(recommend + " | Growth: " + str(percentage_growth[0].round()))
        else:
            recommend = 'Hold'
            reaction = "(I don't even know what to say)"
            text_file.write(recommend + " | Growth: " + str(percentage_growth[0].round()))
        text_file.close()
    
    data = {'idea': recommend, 
    'growth': str(percentage_growth[0].round()) + "%", 'reaction': reaction}
    # os.system("curl -X PATCH -d '{0}' \ 'https://python-mchacks-btc-backend.firebaseio.com/users/jack/name/.json'".format(data))
    # c = pycurl.Curl()
    # c.setopt(c.URL, 'https://python-mchacks-btc-backend.firebaseio.com/users/jack/name/.json')
    # c.setopt(c.WRITEDATA, data)
    # c.perform()
    # c.close()    
    key = 'key'
    firebases = firebase.FirebaseApplication('https://python-mchacks-btc-backend.firebaseio.com/files/data', None)
    firebases.delete('/data', None)
    sent = json.dumps(data)
    result = firebases.patch('/data/{}'.format(key), data)
    print(result)


# def get(self):
#   bucket_name = os.environ.get('BUCKET_NAME',
#                                app_identity.get_default_gcs_bucket_name())

#   self.response.headers['Content-Type'] = 'text/plain'
#   self.response.write('Demo GCS Application running from Version: '
#                       + os.environ['CURRENT_VERSION_ID'] + '\n')
#   self.response.write('Using bucket name: ' + bucket_name + '\n\n')

while True:
    analyze_data()
    print('Done with analysis')
    time.sleep(3600)