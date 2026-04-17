import logging
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

logger = logging.getLogger(__name__)

class CropPredictionModel:
    """
    Agricultural Regression Model using Scikit-Learn.
    Predicts optimal fertilizer input based on soil and weather conditions.
    """
    def __init__(self):
        self.scaler = StandardScaler()
        self.sklearn_model = LinearRegression()
        self.is_trained = False

    def train_mock_data(self):
        """
        Uses Scikit-learn for synthetic data generation and preprocessing,
        then trains the Linear Regression model.
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
        
        # Train Scikit-learn Linear Regression Model
        logger.info("Training Scikit-Learn Linear Regression model...")
        self.sklearn_model.fit(X_train_scaled, y_train)
        sklearn_score = self.sklearn_model.score(X_test_scaled, y_test)
        
        self.is_trained = True
        logger.info(f"Model successfully trained. Sklearn R2: {sklearn_score:.4f}")

    def predict_fertilizer(self, n: float, p: float, k: float, temp: float, moisture: float, use_tf: bool = True):
        """
        Predicts optimal fertilizer amount.
        Note: use_tf parameter kept for API compatibility but always uses Scikit-Learn now.
        """
        if not self.is_trained:
            self.train_mock_data()
            
        features = np.array([[n, p, k, temp, moisture]])
        features_scaled = self.scaler.transform(features)
        
        # Predict using Scikit-Learn Linear Regression Model
        prediction = self.sklearn_model.predict(features_scaled)[0]
        
        return {
            "recommended_fertilizer_kg": round(float(prediction), 2),
            "model_used": "Scikit-Learn Linear Regression"
        }

# Singleton instance
ml_predictor = CropPredictionModel()
