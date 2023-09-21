const path = require("path");

module.exports = {
  webpack: {
    alias: {      
      src: path.resolve(__dirname, "/"), 
      components: path.resolve(__dirname, "src/Components"), 
      ui: path.resolve(__dirname, "src/Components/UI"),
      types: path.resolve(__dirname, "src/types"),
      utils: path.resolve(__dirname, "src/utils"),
      assets: path.resolve(__dirname, "src/assets"),
      contexts: path.resolve(__dirname, "src/contexts"),
      hooks: path.resolve(__dirname, "src/hooks"),
        
    },
  },
};

