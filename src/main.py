from model import Model
from controller import Controller


if __name__ == "__main__":
    model = Model()
    controller = Controller(model)
    
    controller.run(debug=True)