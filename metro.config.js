const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .riv to both assetExts and sourceExts
// config.resolver.assetExts.push('riv');
// config.resolver.sourceExts = [...config.resolver.sourceExts, 'riv'];
config.resolver.assetExts = [...config.resolver.assetExts, 'riv'];
//config.resolver.sourceExts = [...config.resolver.sourceExts];


// Ensure animations directory is included in watchFolders
config.watchFolders = [
  ...config.watchFolders || [],
  `${__dirname}/assets/animations`,
  `${__dirname}/public/assets/animations`,
];

// config.resolver.assetExts.push('riv');

module.exports = config; 