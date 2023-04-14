module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testRegex: "(/__tests__/.*\\.(test|spec))\\.(js|jsx|ts|tsx)$",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
