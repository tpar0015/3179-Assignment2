import pandas as pd


df = pd.read_csv('D:\\Uni\\fit3179\\Assignment 2\\historical_figures\\data\\legacy_pageviews_2008-2013.tsv', sep='\t')

print(df.columns[:11].delete(1))

df1 = df.groupby(['en_curid', 'name', 'numlangs', 'countryCode3', 'birthyear', 'birthcity', 'gender', 'occupation', 'industry', 'domain']).sum()

df1.to_csv('D:\\Uni\\fit3179\\Assignment 2\\historical_figures\\data\\unpivoted_pageviews.csv')
