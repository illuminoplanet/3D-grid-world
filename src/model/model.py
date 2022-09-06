from .env import GridWorldEnv
from .agent import Agent


class Model:
    def __init__(self):
        self.env = GridWorldEnv(2, 2, 2)
        self.agent = Agent(self.env.get_property())
    
    def reshape_environment(self, shape):
        del self.env 
        self.env = GridWorldEnv(shape)
        
        return self.env.get_information()
    
    def change_algorithm(self, algorithm):
        self.env.reset()
        self.agent.change_algorithm(algorithm)
        
        return self.env.get_information()