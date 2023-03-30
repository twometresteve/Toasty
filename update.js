const {exec} = require('node:child_process');
exec('git pull',(err,stdout)=>{
    if (err) console.error(err.message)
    else if (stdout.includes('Already up to date')) console.log('Already up to date with upstream repository.')
    else console.log('Successfully pulled from repository, reloading...'); exec('pm2 restart Toasty')
})