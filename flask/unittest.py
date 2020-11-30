import unittest
from unittest.mock import patch
from src import create_app
import mongomock


class TestApplication(unittest.TestCase):
    def test_main(self):
        with patch("main.PyMongo", side_effect=mongomock.MongoClient):
            # Create the app and run the tests