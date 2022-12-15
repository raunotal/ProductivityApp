module.exports = {
  apps: [
    {
      name: "prodApp",
      append_env_to_name: true,
      script:
        'npm start --port=$PORT',
    },
  ],
  deploy: {
    production: {
      user: "virt114220",
      host: ["217.146.69.55"],
      ref: "origin/main",
      repo: "git@github.com:raunotal/ProductivityApp.git",
      ssh_options: ["ForwardAgent=yes"],
      path: "/data01/virt114220/domeenid/www.retseptipank.ee/deploy/prodApp",
      "post-deploy":
        "npm install && npm run build && pm2 reload /data01/virt114220/domeenid/www.retseptipank.ee/deploy/prodApp/current/ecosystem.config.js",
      env: {
        NODE_ENV: "production",
        PORT: 3007,
      },
    },
  },
};
