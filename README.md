# test-script

## Starting Test

Make sure node.js is installed in your system.

# Test using Postman

```bash
node server.mjs
```
After running the project, It will start on [http://localhost:3000](http://localhost:3000)

/api/test/all GET request run test on all query stored in endeca-query.json file. 

if you want to test One individula query, use /api/test endpoint with a payload in the request

sample payload 
{
    "query":   "N=0+4293588598+500001+4294967266+823+4294689011&Ne=7487&Nr=AND(3,10)&Nu=global_rollup_key&Np=2&Ns=sort_date_common|1"

}

## Test using command line
open main.mjs file uncomment //main() code. 
and in the terminal run following command
```bash
node main.mjs
```