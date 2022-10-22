from .env import GridWorldEnv
from .agent import Agent


class Model:
    def initialize(self, env_shape, algorithm):
        self.env = GridWorldEnv(*env_shape)
        self.agent = Agent(self.env.get_property())
        self.agent.change_algorithm(algorithm)

        info = self.env.get_information()
        info["policy"] = self.agent.get_policy() 
        info["action_history"] = None
        info["env_shape"] = env_shape
        info["algorithm"] = algorithm
        info["env_run"] = False
        
        return info
    
    def reshape_environment(self, shape):
        del self.env 
        self.env = GridWorldEnv(*shape)
        info = self.env.get_information()
        info["env_run"] = False
        
        return info
    
    def change_algorithm(self, algorithm):
        self.env.reset()
        self.agent.change_algorithm(algorithm)
        info = self.env.get_information()
        info["env_run"] = False
        
        return info

    def step(self, episode_stride, max_episode_length):
        trajectory = None
        for _ in range(episode_stride):
            obs = self.env.reset()
            trajectory = [obs]

            # Interaction loop 
            for _ in range(max_episode_length):
                action = self.agent.choose_action(obs)
                obs, reward, done, _ = self.env.step(action)

                trajectory.extend([action, reward, obs])
                if done:
                    break
            
            # Learn / Plan 
            self.agent.improve(trajectory)
               
        action_history = self._extract_action_history(trajectory)
        return { "policy" : self.agent.get_policy(), "action_history" : action_history }

    def _extract_action_history(self, trajectory):
        action_history = [trajectory[i] for i in range(1, len(trajectory), 3)]
        return action_history
        