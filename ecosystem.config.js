module.exports = {
  deploy: {
    production: {
      user: "virt114220",
      host: ["217.146.69.55"],
      ref: "origin/main",
      repo: "git@github.com:raunotal/ProductivityApp.git",
      ssh_options: ["ForwardAgent=yes"],
      path: "/data01/virt114220/domeenid/www.retseptipank.ee/deploy/prodApp",
      "pre-deploy-local": "ssh-add",
      "post-deploy":
        "npm --name prodApp && npm build && npm start && pm2 reload /data01/virt114220/domeenid/www.retseptipank.ee/deploy/prodApp/current/ecosystem.config.js",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
