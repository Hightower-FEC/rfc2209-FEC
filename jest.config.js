module.exports = { moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
},
transformIgnorePatterns: ['/node_modules/(?!(axios|@testing-library/jest-dom)/)'],
setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
testEnvironment: 'jsdom' };