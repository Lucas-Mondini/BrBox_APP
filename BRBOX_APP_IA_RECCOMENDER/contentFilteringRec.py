import pandas as pd
from sklearn.metrics.pairwise import linear_kernel
# Import TfIdfVectorizer from scikit-learn
from sklearn.feature_extraction.text import TfidfVectorizer

#carrega os dados (substituir pelo SQL)
metadata = pd.read_csv('data/app.csv', low_memory=False)

# Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
tfidf = TfidfVectorizer(stop_words='english')
# Replace NaN with an empty string
metadata['overview'] = metadata['overview'].fillna('')

#cria uma matriz baseada na coluna overview
tfidf_matrix = tfidf.fit_transform(metadata['overview'])
#utiliza a distancia euclidiana para pegar os vizinho mais proximo
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
#Organiza a tabela baseada na reorganização da coluna overview
indices = pd.Series(metadata.index, index=metadata['overview']).drop_duplicates()
#ATÉ AQUI É TRATAMENTO

# Function that takes in games overview as input and outputs most similar games
def get_recommendations(overview, cosine_sim=cosine_sim):
    # pega o indice do overview
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
    return game_indices

j = get_recommendations(1)
print(j)

# User-item-Based Recommender (Collaborative)
# print('User-item-Based Recommender (Collaborative)')



