import numpy as np
import gym


class GridWorldEnv(gym.Env):
    def __init__(self, *shape):
        super().__init__()

        self.shape = np.array(shape)
        self.dim = len(shape)

        self.obs_space = gym.spaces.MultiDiscrete(shape)
        self.action_space = gym.spaces.Discrete(self.dim * 2)

        self.agent_pos = np.zeros(self.dim, dtype=int)
        self.target_pos = self._set_target_pos()

    def reset(self):
        self.agent_pos = np.zeros(self.dim, dtype=int)
        self.target_pos = self._set_target_pos()
        return self.agent_pos

    def step(self, action):
        _displacement = self._action_to_displacement(action)
        self.agent_pos = np.clip(self.agent_pos + _displacement, 0, self.shape - 1)

        observation = self.agent_pos
        done = np.array_equal(self.agent_pos, self.target_pos)
        reward = -1 + done
        info = None

        return observation, done, reward, info

    def get_model(self):
        model = {"reward": self._get_reward, "transition": self._get_transtion}
        return model
    
    def get_information(self):
        info = {
            "agent_pos" : self.agent_pos.tolist(),
            "target_pos" : self.target_pos.tolist()
        }
        return info
    
    def get_property(self):
        prop = {
            "obs_space" : self.obs_space,
            "action_space" : self.action_space,
            "model" : self.get_model()
        }
        return prop

    def _action_to_displacement(self, action):
        displacement = np.eye(self.dim, dtype=int)[action // 2] * (1 if action % 2 else -1)
        return displacement

    def _set_target_pos(self):
        target_pos = self.obs_space.sample()
        while np.array_equal(self.agent_pos, target_pos):
            target_pos = self.obs_space.sample()

        return target_pos

    def _get_reward(self, state):
        reward = 0 if np.array_equal(state, self.target_pos) else -1
        return reward

    def _get_transtion(self, state, action):
        _displacement = self._action_to_displacement(action)
        state_prime = np.clip(state + _displacement, 0, self.shape - 1)
        return state_prime