const getModuleFlag = (moduleName: string) => {
  // Add console log to debug env variables
  console.log(`Checking ${moduleName}:`, process.env[`EXPO_PUBLIC_ENABLE_${moduleName}`]);
  
  // Check URL first for preview deployments
  const url = typeof window !== 'undefined' ? window.location.hostname : '';
  if (url.includes('dst')) return moduleName === 'DISTANCED_SELF_TALK';
  if (url.includes('mood')) return moduleName === 'MOOD';
  if (url.includes('mindfulness')) return moduleName === 'MINDFULNESS';
  
  // Fallback to env variables with explicit boolean conversion
  return process.env[`EXPO_PUBLIC_ENABLE_${moduleName}`] === 'true';
};

export const MODULE_FLAGS = {
  DISTANCED_SELF_TALK: getModuleFlag('DISTANCED_SELF_TALK'),
  MOOD: getModuleFlag('MOOD'),
  MINDFULNESS: getModuleFlag('MINDFULNESS'),
};

// Log the final flags configuration
console.log('Final MODULE_FLAGS:', MODULE_FLAGS); 