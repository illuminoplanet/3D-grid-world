import numpy as np


class PolicyIteration:
    def __init__(self, obs_space, action_space, model, terminal_state, gamma=1, k=10):
        # observation space & action space
        self.obs_space = obs_space
        self.action_space = action_space

        # state value & policy
        self.state_value = np.zeros(obs_space.nvec, dtype=float)
        self.policy = np.full((*obs_space.nvec, action_space.n), 1 / action_space.n)

        # reward & transition function (model based)
        self.reward = model["reward"]  # R
        self.transition = model["transition"]  # P
        self.terminal_state = tuple(terminal_state)

        # discount factor & number of iterations
        self.gamma = gamma
        self.k = k

    def get_policy(self):
        return self.policy.tolist()

    def choose_action(self, obs):
        return np.random.choice(self.action_space.n, p=self.policy[tuple(obs)])

    def improve(self, _trajectory):
        self._evaluate_policy()
        self._improve_policy()

        self.state_value *= 0

    def _evaluate_policy(self):
        # repeat iteration k times 
        for _ in range(self.k):
            it = np.nditer(self.state_value, flags=["multi_index"], op_flags=["readwrite"])
            while not it.finished:
                state = it.multi_index
                if state == self.terminal_state:
                    it.iternext()
                    continue

                # array of next states and rewards
                state_primes = np.array([self.transition(state, action) for action in range(self.action_space.n)])
                rewards = self.reward(np.array(state))

                # update state value using Bellman Expectation Equation (in-place)
                temp = rewards + self.gamma * self.state_value[tuple(state_primes.T)]
                self.state_value[state] = np.round(np.sum(temp * self.policy[state]), 2)

                it.iternext()

    def _improve_policy(self):
        it = np.nditer(self.state_value, flags=["multi_index"], op_flags=["readwrite"])
        while not it.finished:
            state = it.multi_index
            if state == self.terminal_state:
                it.iternext()
                continue

            # array of next states and rewards
            state_primes = np.array([self.transition(state, action) for action in range(self.action_space.n)])
            rewards = self.reward(np.array(state))

            # update policy (greedy)
            temp = rewards + self.gamma * self.state_value[tuple(state_primes.T)]
            greedy_action = np.equal(temp, np.max(temp))
            self.policy[state] = greedy_action / np.sum(greedy_action)

            it.iternext()

    