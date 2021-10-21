import pandas as pd

db = pd.read_csv('data\\person_2020_update.csv')
df = db.head(50)
df.to_csv('data\\top50.csv',index=False)