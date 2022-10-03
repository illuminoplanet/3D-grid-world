from flask import Flask, request, render_template


class Controller:
    def __init__(self, model):
        self.model = model
        
    def run(self, **kwargs):
        self.app = self._get_flask_app()
        self.app.run(**kwargs)
        
    def _get_flask_app(self):
        app = Flask(__name__, template_folder="../view", static_folder="../view")
        
        @app.route("/")
        def index():
            return render_template("index.html")

        @app.route("/initialize", endpoint="initialize", methods=["POST"])
        def initialize():
            kwargs = request.json["data"]
            return self.model.initialize(**kwargs)

        @app.route("/reshape_environment", endpoint="reshape_environment", methods=["POST"])
        def reshape_environment():
            shape = request.json["data"]
            info = self.model.reshape_environment(shape)
            return info
        
        @app.route("/change_algorithm", endpoint="change_algorithm", methods=["POST"])
        def change_algorithm():
            algorithm = request.json["data"]
            info = self.model.change_algorithm(algorithm)
            return info
        
        @app.route("/toggle_run", endpoint="toggle_run", methods=["POST"])
        def toggle_run():
            env_run = request.json["data"]
            return { "env_run" : env_run }

        @app.route("/fetch_policy_value", endpoint="fetch_policy_value", methods=["POST"])
        def fetch_policy_value():
            stride = request.json["data"]
            policy_value = self.model.step(stride)
            return policy_value

        return app
        
    def _interconvert_array_list(data):
        return data