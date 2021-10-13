import pandas as pd


df = pd.read_csv('D:\\Uni\\fit3179\\Assignment 2\\historical_figures\\data\\unpivoted_pageviews.csv')

constants = df.columns[:10]
dates = df.columns[10:]

df1 = df.melt(id_vars=constants, value_vars=dates)

df1 = df1.rename(columns={'variable':'date','value':'pageviews'})
df1.to_csv('D:\\Uni\\fit3179\\Assignment 2\\historical_figures\\data\\pivoted_pageviews.csv')