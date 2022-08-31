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

        @app.route("/reshape_environment", endpoint="reshape_environment", methods=["POST"])
        def reshape_environment():
            shape = request.json["data"]
            return { "reshape_environment" : [0, 0, 0]}

        return app 