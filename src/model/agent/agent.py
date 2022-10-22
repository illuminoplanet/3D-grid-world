from .algorithm.policy_iteration import PolicyIteration


class Agent:
    def __init__(self, env_property):
        self.env_property = env_property
        self.algorithm_map = {
            "policy_iteration" : PolicyIteration
        }
        self.algorithm = PolicyIteration(**self.env_property)
        
    def change_algorithm(self, algorithm):
        del self.algorithm
        self.algorithm = self.algorithm_map[algorithm](**self.env_property)

    def choose_action(self, obs):
        return self.algorithm.choose_action(obs)
        
    def get_policy(self):
        return self.algorithm.get_policy()

    def improve(self, trajectory):
        self.algorithm.improve(trajectory)

    