from .algorithm.policy_iteration import PolicyIteration


class Agent:
    def __init__(self, env_property):
        self.obs_space = env_property["obs_space"]
        self.action_space = env_property["action_space"]
        self.model = env_property["model"]
        
        self.algorithm_map = {
            "policy_iteration" : PolicyIteration
        }
        self.algorithm = PolicyIteration(self.obs_space, self.action_space, self.model)
        
    def change_algorithm(self, algorithm):
        del self.algorithm
        self.algorithm = self.algorithm_map[algorithm](self.obs_space, self.action_space, self.model)
        