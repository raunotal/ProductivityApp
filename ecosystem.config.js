module.exports = {
  deploy: {
    production: {
      user: "virt114220",
      host: ["217.146.69.55"],
      ref: "origin/main",
      repo: "git@github.com:raunotal/ProductivityApp.git",
      ssh_options: ["ForwardAgent=yes"],
      path: "/data01/virt114220/domeenid/www.retseptipank.ee/deploy",
      "pre-deploy-local": "ssh-add",
      "post-deploy":
        "yarn && yarn build && pm2 reload /var/www/singleton.ee/current/ecosystem.config.js --env development",
      env: {
        PORT: 3000,
      },
    },
  },
};
