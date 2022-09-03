from env import GridWorldEnv


class Model:
    def __init__(self):
        self.env = GridWorldEnv(2, 2, 2)
    
    def reshape_environment(self, shape):
        del self.env 
        self.env = GridWorldEnv(shape)
        
        return self.env.get_information()