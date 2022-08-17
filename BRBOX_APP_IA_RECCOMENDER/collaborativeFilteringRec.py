import pandas as pd
from surprise import Reader, Dataset, SVD
from surprise.model_selection import KFold

reader = Reader()
ratings = pd.read_csv('data/app.csv')


class CollaborativeFilter:
    predicted = []

    def __init__(self, userId, gameAmmount, values):
        self.predicted = []
        ratings2 = pd.DataFrame(values);
        ratings2.columns = ('userid', 'gameid', 'tagid', 'tag', 'score', 'vote_count', 'overview')

        # busca no dataset as colunas ['userid', 'tagid', 'score']
        data = Dataset.load_from_df(ratings2[['userid', 'gameid', 'score']], reader)
        # separa a base em 5
        kf = KFold(n_splits=5)
        kf.split(data)
        # separa a base em 5

        svd = SVD()

        # constroi o conjunto de treinamento
        trainset = data.build_full_trainset()
        # treina o algoritmo baseado no conjunto de treinamento
        svd.fit(trainset)

        ratings2[ratings2['userid'] == 1]
        for i in range(gameAmmount):
            predicted = svd.predict(userId, i + 1)
            j_obj = {
                "user": predicted[0],
                "game": predicted[1],
                "est": predicted[3]
            }
            self.predicted.append(j_obj)
