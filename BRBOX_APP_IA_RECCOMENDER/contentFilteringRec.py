import pandas as pd
# Import linear_kernel
from sklearn.metrics.pairwise import linear_kernel

# Load Metadata
metadata = pd.read_csv('data/app.csv', low_memory=False)

# gameTime = [[0-2, 1], [2-5, 1], [5-8, 2], [8-12, 2], [12-20, 2], [20-50, 3], [50-100, 3], [100+, 3]]

# Content-Based Recommender
print('Content-Based Recommender')
print(metadata['overview'].head())

# Import TfIdfVectorizer from scikit-learn
from sklearn.feature_extraction.text import TfidfVectorizer

# Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
tfidf = TfidfVectorizer(stop_words='english')

# Replace NaN with an empty string
metadata['overview'] = metadata['overview'].fillna('')

# Construct the required TF-IDF matrix by fitting and transforming the data
tfidf_matrix = tfidf.fit_transform(metadata['overview'])

# Output the shape of tfidf_matrix
print(tfidf_matrix.shape)

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
print(cosine_sim.shape)
print(cosine_sim[1])

# Construct a reverse map of indices and games
indices = pd.Series(metadata.index, index=metadata['overview']).drop_duplicates()
print(indices[:10])


# Function that takes in games overview as input and outputs most similar games
def get_recommendations(overview, cosine_sim=cosine_sim):
    # Get the index of the game that matches the overview
    idx = indices[overview]

    # Get the pairwsie similarity scores of all game with that game
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the game based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar games
    sim_scores = sim_scores[1:11]

    # Get the games indices
    game_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar games
    return metadata['overview'].iloc[game_indices]


print(get_recommendations(1))

# User-item-Based Recommender (Collaborative)
# print('User-item-Based Recommender (Collaborative)')



