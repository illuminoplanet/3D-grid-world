from .env import GridWorldEnv
from .agent import Agent


class Model:
    def initialize(self, env_shape, algorithm):
        self.env = GridWorldEnv(*env_shape)
        self.agent = Agent(self.env.get_property())
        self.agent.change_algorithm(algorithm)

        info = self.env.get_information()
        info["policy_value"] = self.agent.get_policy_value() 
        info["env_shape"] = env_shape
        info["algorithm"] = algorithm
        info["env_run"] = False
        
        return info
    
    def reshape_environment(self, shape):
        del self.env 
        self.env = GridWorldEnv(*shape)
        
        return self.env.get_information()
    
    def change_algorithm(self, algorithm):
        self.env.reset()
        self.agent.change_algorithm(algorithm)
        
        return self.env.get_information()

    def step(self, stride):
        for _ in range(stride):
            self.agent.step()
        return { "policy_value" : self.agent.get_policy_value() }