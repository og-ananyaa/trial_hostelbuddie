# from flask import Flask, request, jsonify
# import pandas as pd
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.metrics.pairwise import cosine_similarity


# app =Flask(__name__)





# data = pd.read_csv("https://docs.google.com/spreadsheets/d/1LthSMETRap-PO-tuC5H2ycif27c7kzKnUUdwpGUCwz0/export?format=csv")
# #print(df.head())
# def preprocess(df):
#     relevant_columns = ['Year', 
#     'Branch', 'Hosteller/Day scholar'
#     'Are you a night owl or an early riser?', 
#     'What are your food preferences?',
#     'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)','Home city/town']
#     df = data[relevant_columns]
#     return df

# df = preprocess(data)
# label_encoders = {}
# for col in['YEAR','Home city/town',  'Hosteller/Day scholar','Branch','Are you a night owl or an early riser?','What are your food preferences?']:
#  le = LabelEncoder()
# df[col]=le.fit_transform(df[col])
# label_encoders[col] = le

# weights = {
#     'YEAR' :5,
#     'Hosteller/Day scholar' :10,
#     'Branch': 2,
#     'Are you a night owl or an early riser?':4,
#     'What are your food preferences?':3,
#     'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)':3,
#     'Home city/town':1 

# }

# weighted_df = df.copy()
# for feature, weight in weights.items():
#     weighted_df[feature] = df[feature]* weight


# scaler = StandardScaler()
# df['Cleanliness'] = scaler.fit_transform(df[['What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)']])


# #function for getting top two matches 
# def get_matches(data,weighted_df,num_matches=4):
#     recommendation = {}
#     for idx,profile in weighted_df.iterrows():
#         profile_df = profile.values.reshape(1,-1)
#         scores = cosine_similarity(profile_df,weighted_df).flatten()
#         scores[idx]=-1 #exclude self from the matches
#         top_indices = scores.argsort()[-4:][::-1]
#         recommendation[data.iloc[idx]['Name']]=data.iloc[top_indices][['Name', 'YEAR', 'Branch', 'Are you a night owl or an early riser?',
#         'What are your food preferences?', 'Home city/town',
#         'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)'
#                                                                           ]]
#     return recommendation    


# @app.route("/find_matches", methods=["POST"])
# def find_matches():
#     try:
#         # Extract request data
#         request_data = request.get_json()
#         sheet_url = request_data.get("sheet_url")
#         input_text = request_data.get("input_text")
        
#         if not sheet_url or not input_text:
#             return jsonify({"error": "sheet_url and input_text are required"}), 400
        
#         # Load and process the data
#         data =  pd.read_csv("https://docs.google.com/spreadsheets/d/1LthSMETRap-PO-tuC5H2ycif27c7kzKnUUdwpGUCwz0/export?format=csv")
#         data = preprocess(data)
        
#         # Get top 5 matches
#         matches = get_matches(input_text,data, weighted_df)
        
#         # Return results as JSON
#         return jsonify(matches.to_dict(orient="records"))
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500





# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=8000)  # Specify the port number here


from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Preprocessing Function
def preprocess(data):
    relevant_columns = [
        'Year', 'Gender' 'Branch', 'Hosteller/Day scholar',
        'Are you a night owl or an early riser?',
        'What are your food preferences?',
        'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)',
        'Home city/town'
    ]
    return data[relevant_columns]

# Match Function
def get_matches(data, weighted_df, num_matches=5):
    recommendations = {}
    for idx, profile in weighted_df.iterrows():
        profile_df = profile.values.reshape(1, -1)
        scores = cosine_similarity(profile_df, weighted_df).flatten()
        scores[idx] = -1  # Exclude self
        top_indices = scores.argsort()[-num_matches:][::-1]
        recommendations[data.iloc[idx]['Name']] = data.iloc[top_indices][[
            'Name', 'Year', 'Gender','Branch', 'Are you a night owl or an early riser?',
            'What are your food preferences?', 'Home city/town',
            'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)'
        ]].to_dict(orient="records")
    return recommendations

@app.route("/find_matches", methods=["POST"])
def find_matches():
    try:
        request_data = request.get_json()
        #sheet_url = request_data.get("https://docs.google.com/spreadsheets/d/1LthSMETRap-PO-tuC5H2ycif27c7kzKnUUdwpGUCwz0/export?format=csv")
        input_text = request_data.get("input_text")
        
        if not input_text:
            return jsonify({"error": "sheet_url and input_text are required"}), 400

        # Load data
        data = pd.read_csv("https://docs.google.com/spreadsheets/d/1LthSMETRap-PO-tuC5H2ycif27c7kzKnUUdwpGUCwz0/export?format=csv")
        data = preprocess(data)

        # Encode and scale data
        label_encoders = {}
        for col in ['Year','Gender', 'Home city/town', 'Hosteller/Day scholar', 'Branch', 
                    'Are you a night owl or an early riser?', 'What are your food preferences?']:
            le = LabelEncoder()
            data[col] = le.fit_transform(data[col])
            label_encoders[col] = le

        weights = {
            'Year': 5, 'Hosteller/Day scholar': 25,'Gender':20, 'Branch': 2,
            'Are you a night owl or an early riser?': 4, 'What are your food preferences?': 3,
            'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)': 3,
            'Home city/town': 1
        }

        weighted_df = data.copy()
        for feature, weight in weights.items():
            weighted_df[feature] = data[feature] * weight

        scaler = StandardScaler()
        data['Cleanliness'] = scaler.fit_transform(data[[
            'What would you rate yourself on the scale of 1-5 in cleanliness ?(5-being you clean your room everyday)'
        ]])
        weighted_df['Cleanliness'] = data['Cleanliness']

        # Get matches
        recommendations = get_matches(data, weighted_df)
        user_recommendations = recommendations.get(input_text)
        if not user_recommendations:
            return jsonify({"error": f"No matches found for user {input_text}"}), 404

        return jsonify(user_recommendations)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
