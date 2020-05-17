/*
 * config file for node module pm2 process manager.
 */

module.exports = {
  apps : [{
    name: 'API',
    script: 'songwriter.js',
    cwd: '/home/pansq212/projects/jsn/songwriter',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    //args: 'one two',
    instances: 0,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'development'
    }
  }],

  deploy : {
    production : {
      user : 'pansq212',
      host : 'weblane.com:3000',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/home/pansq212/projects/jsn/songwriter',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

