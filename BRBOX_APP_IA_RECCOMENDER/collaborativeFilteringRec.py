import pandas as pd
from surprise import Reader, Dataset, SVD
from surprise.model_selection import KFold
from database.connection import Database

reader = Reader()
ratings = pd.read_csv('data/app.csv')

cursor, colnames = Database().execute_sql('''
select 
		u.id 					userId,
		g.id 					gameId,
		t.id 					tagId,
		t."name"				tag,
		v.id					score,
		vote.countV 			vote_count,
		t.description_positive 	overview
from 
		game g
inner join
		tag_value_list_tag_values_tag_value tvltvtv on tvltvtv."tagValueListId" = g."tagListId" 
inner join 
		tag_value tv on tv.id = tvltvtv."tagValueId"
inner join 
		tag t on t.id = tv."tagId"
inner join 
		value v on v.id = tv."valueId"
inner join 
		"user" u on u.id = tv."userId"
inner join (
		select count(tv2."tagId") as countv, game.id gameId from game
		inner join tag_value_list_tag_values_tag_value tvltvtv2 on tvltvtv2."tagValueListId" = game."tagListId"
		inner join tag_value tv2 on tv2.id = tvltvtv2."tagValueId"
		group by game.id
		) vote on vote.gameId = g.id ''')
ratings2 = pd.DataFrame(cursor);
ratings2.columns = colnames

#busca no dataset as colunas ['userid', 'tagid', 'score']
data = Dataset.load_from_df(ratings2[['userid', 'gameid', 'score']], reader)
#separa a base em 5
kf = KFold(n_splits=5)
kf.split(data)
#separa a base em 5

svd = SVD()

#constroi o conjunto de treinamento
trainset = data.build_full_trainset()
#treina o algoritmo baseado no conjunto de treinamento
svd.fit(trainset)

ratings2[ratings2['userid'] == 1]
a = []
for i in range(10):
    a.append(svd.predict(2, i+1, 1000))

a;
for i in a:
    print(i)