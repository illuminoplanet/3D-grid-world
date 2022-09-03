import numpy as np


class PolicyIteration:
    def __init__(self, obs_space, action_space, model, gamma=1, k=10):
        # observation space & action space
        self.obs_space = obs_space
        self.action_space = action_space

        # state value & policy
        self.state_value = np.zeros(obs_space.nvec, dtype=float)
        self.policy = np.full((*obs_space.nvec, action_space.n), 1 / action_space.n)

        # reward & transition function (model based)
        self.reward = model["reward"]  # R
        self.transition = model["transition"]  # P

        # discount factor & number of iterations
        self.gamma = gamma
        self.k = k

    def plan(self):
        self.evaluate()
        self.improve()

    def evaluate(self):
        # repeat iteration k times 
        for _ in range(self.k):
            it = np.nditer(self.state_value, flags=["multi_index"], op_flags=["readwrite"])
            while not it.finished:
                state = it.multi_index

                # array of next states and rewards
                state_primes = np.array([self.transition(state, action) for action in range(self.action_space.n)])
                rewards = np.array([self.reward(state_prime) for state_prime in state_primes])

                # update state value using Bellman Expectation Equation (in-place)
                temp = rewards + self.gamma * self.state_value[tuple(state_primes.T)]
                self.state_value[state] = np.round(np.sum(temp * self.policy[state]), 2)

                it.iternext()

    def improve(self):
        it = np.nditer(self.state_value, flags=["multi_index"], op_flags=["readwrite"])
        while not it.finished:
            state = it.multi_index

            # array of next states and rewards
            state_primes = np.array([self.transition(state, action) for action in range(self.action_space.n)])
            rewards = np.array([self.reward(state_prime) for state_prime in state_primes])

            # update policy (greedy)
            temp = rewards + self.gamma * self.state_value[tuple(state_primes.T)]
            greedy_action = np.equal(temp, np.max(temp))
            self.policy[state] = greedy_action / np.sum(greedy_action)

            it.iternext()