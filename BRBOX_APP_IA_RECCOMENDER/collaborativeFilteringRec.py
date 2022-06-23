import pandas as pd
from surprise import Reader, Dataset, SVD
from surprise.model_selection import KFold

reader = Reader()
ratings = pd.read_csv('data/app.csv')
print(ratings.head())

data = Dataset.load_from_df(ratings[['userId', 'tagId', 'score']], reader)
kf = KFold(n_splits=5)
kf.split(data)

svd = SVD()

trainset = data.build_full_trainset()
svd.fit(trainset)

ratings[ratings['userId'] == 1]

print(svd.predict(1, 1, 1000))


