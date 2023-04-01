import {exec} from 'node:child_process';
exec('git pull && tsc',(err,stdout)=>{
  if (err) console.error(err.message)
  else if (stdout.includes('Already up to date')) console.log('Already up to date with upstream repository.')
  else console.log('Pulled successfully and compiling...'); exec('pm2 restart Toasty')
})