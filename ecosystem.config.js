/*
 * Config file for node module pm2 process manager.
 */

module.exports = {
  apps : [{
    name: 'songwriter',
    script: 'songwriter.js',
    cwd: '/home/pansq212/projects/jsn/songwriter',
		out_file: '/home/pansq212/projects/jsn/songwriter/log/acces.log',
		error_file: '/home/pansq212/projects/jsn/songwriter/log/error.log',
		time: true,

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    //args: 'one two',
    instances: 0,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
      LD_LIBRARY_PATH="/opt/glibc-2.14/lib/"
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

