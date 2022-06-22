import pandas as pd

# Load Metadata
metadata = pd.read_csv('data/app.csv', low_memory=False)

# gameTime = [[0-2, 1], [2-5, 1], [5-8, 2], [8-12, 2], [12-20, 2], [20-50, 3], [50-100, 3], [100+, 3]]

# mostRated

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
print(q_tag[['game', 'tag', 'score', 'vote_count']].head(5))


