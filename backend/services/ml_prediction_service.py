import logging
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Suppress verbose TF warnings
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import tensorflow as tf

logger = logging.getLogger(__name__)

class CropPredictionModel:
    """
    Expert Agricultural Regression Model utilizing both Scikit-Learn 
    and TensorFlow Deep Neural Networks.
    """
    def __init__(self):
        self.scaler = StandardScaler()
        self.sklearn_model = LinearRegression()
        self.tf_model = self._build_tf_regression_model()
        self.is_trained = False

    def _build_tf_regression_model(self):
        """
        Builds a TensorFlow/Keras Deep Neural Network regression model 
        to predict optimal fertilizer input.
        """
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(5,)), # Features: N, P, K, Temp, Moisture
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1) # Linear activation for regression output
        ])
        model.compile(optimizer='adam', loss='mse', metrics=['mae'])
        return model

    def train_mock_data(self):
        """
        Uses Scikit-learn for synthetic data generation and preprocessing,
        then trains both Sklearn and TensorFlow regression models offline.
        """
        logger.info("Initializing ML synthetic dataset...")
        # Feature columns: [Nitrogen, Phosphorus, Potassium, Temperature, Moisture]
        np.random.seed(42)
        X = np.random.rand(1000, 5) * 100 
        
        # Target: Recommended Fertilizer amount (regression target based on NPK/weather constraints)
        y = (X[:, 0]*0.4 + X[:, 1]*0.2 + X[:, 2]*0.2 + X[:, 3]*0.1 + X[:, 4]*0.1) + np.random.randn(1000) * 5
        
        # Scikit-learn split and scale
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features using Scikit-learn
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # 1. Train Scikit-learn Baseline Regression Model
        logger.info("Training Scikit-Learn Linear Regression model...")
        self.sklearn_model.fit(X_train_scaled, y_train)
        sklearn_score = self.sklearn_model.score(X_test_scaled, y_test)
        
        # 2. Train TensorFlow DNN Regression Model
        logger.info("Training TensorFlow Neural Network representation...")
        self.tf_model.fit(X_train_scaled, y_train, epochs=20, batch_size=32, verbose=0, validation_split=0.2)
        tf_loss, tf_mae = self.tf_model.evaluate(X_test_scaled, y_test, verbose=0)
        
        self.is_trained = True
        logger.info(f"Models successfully trained. Sklearn R2: {sklearn_score:.4f}, TF MAE: {tf_mae:.4f}")

    def predict_fertilizer(self, n: float, p: float, k: float, temp: float, moisture: float, use_tf: bool = True):
        if not self.is_trained:
            self.train_mock_data()
            
        features = np.array([[n, p, k, temp, moisture]])
        features_scaled = self.scaler.transform(features)
        
        if use_tf:
            # Predict using TensorFlow Regression Model
            prediction = self.tf_model.predict(features_scaled, verbose=0)[0][0]
            model_used = "TensorFlow DNN Regression"
        else:
            # Predict using Scikit-Learn Regression Model
            prediction = self.sklearn_model.predict(features_scaled)[0]
            model_used = "Scikit-Learn Linear Regression"
            
        return {
            "recommended_fertilizer_kg": round(float(prediction), 2),
            "model_used": model_used
        }

# Singleton instance
ml_predictor = CropPredictionModel()
