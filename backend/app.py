import os
import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend communication

# Path to the trained model pipeline
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'pipeline.pkl')

# Load model pipeline safely
model = None
if os.path.exists(MODEL_PATH):
  model = joblib.load(MODEL_PATH)
  print(f'Model successfully loaded from {MODEL_PATH}')
else:
  print(f'WARNING: Model file not found at {MODEL_PATH}')

@app.route('/', methods=['GET'])
def home():
  return jsonify({
      'message': 'Welcome to the Employee Attrition Prediction API!',
      'endpoints': {'health': '/health', 'predict': '/predict (POST)'},
  })

@app.route('/health', methods=['GET'])
def health_check():
  """Simple health check endpoint."""
  return (
      jsonify({
          'status': 'healthy',
          'model_loaded': model is not None,
      }),
      200,
  )


@app.route('/predict', methods=['POST'])
def predict():
  """Accepts JSON with the 8 features and returns prediction + probability."""
  try:
    if model is None:
      return jsonify({'error': 'Model not loaded on server.'}), 500

    data = request.get_json()
    if not data:
      return jsonify({'error': 'No input data provided'}), 400

    # Define the 8 expected features from the assignment
    expected_features = [
        'Education',
        'JoiningYear',
        'City',
        'PaymentTier',
        'Age',
        'Gender',
        'EverBenched',
        'ExperienceInCurrentDomain',
    ]

    # Validate missing features
    missing = [feat for feat in expected_features if feat not in data]
    if missing:
      return jsonify({'error': f'Missing required features: {missing}'}), 400

    # Create a DataFrame for prediction (pipeline expects DataFrame feature names)
    input_df = pd.DataFrame([data])

    # Make prediction and get probability score
    prediction = int(model.predict(input_df)[0])
    probability = float(model.predict_proba(input_df)[0][1])

    message = (
        'Employee is likely to leave'
        if prediction == 1
        else 'Employee is likely to stay'
    )

    return (
        jsonify({
            'prediction': prediction,
            'probability': round(probability, 4),
            'message': message,
        }),
        200,
    )

  except Exception as e:
    return jsonify({'error': str(e)}), 500


@app.route('/model-info', methods=['GET'])
def model_info():
  """Returns model metrics and feature importance information."""
  return (
      jsonify({
          'model_type': 'RandomForestClassifier',
          'features': [
              'Education',
              'JoiningYear',
              'City',
              'PaymentTier',
              'Age',
              'Gender',
              'EverBenched',
              'ExperienceInCurrentDomain',
          ],
          'target': 'LeaveOrNot (0 = Stay, 1 = Leave)',
      }),
      200,
  )


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)