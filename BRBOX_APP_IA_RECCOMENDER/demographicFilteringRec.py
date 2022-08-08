import pandas as pd
from database.connection import Database


# Load Metadata
#metadata = pd.read_csv('data/app.csv', low_memory=False)
cursor, colnames = Database().execute_sql('''
select 
		u.id 					userId,
		g.id 					game,
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
metadata = pd.DataFrame(cursor);
metadata.columns = colnames

# Calculate mean
C = metadata['score'].mean()
print(C)

# Calculate the minimum number of votes
m = metadata['vote_count'].quantile(0.90)
print(m)

# Filter out all qualified tag into a new DataFrame
q_tag = metadata.copy().loc[metadata['vote_count'] >= m]
print(q_tag.shape)
print(metadata.shape)

print('Simple Recommenders')

# Function that computes the weighted rating of each tag
def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['score']
    return (v / (v + m) * R) + (m / (m + v) * C)


# Define a new feature 'score' and calculate its value with `weighted_rating()`
q_tag['score'] = q_tag.apply(weighted_rating, axis=1)

# Sort tag based on score calculated above
q_tag = q_tag.sort_values('score', ascending=False)

# Print the top 5 tag
print(q_tag.groupby("userid")['game'].head(6))

