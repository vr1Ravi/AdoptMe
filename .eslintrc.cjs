module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/error",
    "plugin:react/recommend",
    "plugin:jsx-ally/recommend",

    "prettier",
  ],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
  },
  plugins: ["react", "import", "jsx-ally"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
};
