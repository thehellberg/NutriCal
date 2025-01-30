/* eslint-disable @typescript-eslint/no-require-imports */
// This replaces `const { getDefaultConfig } = require('expo/metro-config');`

const path = require('path')

const { getSentryExpoConfig } = require('@sentry/react-native/metro')
const findWorkspaceRoot = require('find-yarn-workspace-root')
const { withNativeWind } = require('nativewind/metro')
const {
  wrapWithReanimatedMetroConfig
} = require('react-native-reanimated/metro-config')

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = findWorkspaceRoot(__dirname)

// This replaces `const config = getDefaultConfig(__dirname);`
const config = getSentryExpoConfig(__dirname, { annotateReactComponents: true })
config.maxWorkers = 2
// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules')
]
module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), {
  input: './global.css'
})
