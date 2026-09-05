const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'_site'),port=+process.argv[2]||8099;
const T={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.svg':'image/svg+xml','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain','.json':'application/json'};
http.createServer((req,res)=>{
  let u=decodeURIComponent(req.url.split('?')[0]);
  let f=path.join(root,u);
  try{ if(fs.statSync(f).isDirectory()) f=path.join(f,'index.html'); }
  catch(e){ if(fs.existsSync(f+'.html')) f=f+'.html'; else { res.writeHead(404);return res.end('404'); } }
  if(!fs.existsSync(f)){res.writeHead(404);return res.end('404');}
  const st=fs.statSync(f),ct=T[path.extname(f)]||'application/octet-stream';
  const range=req.headers.range;
  if(range){
    const m=/bytes=(\d*)-(\d*)/.exec(range);
    const s=m[1]?+m[1]:0, e=m[2]?+m[2]:st.size-1;
    res.writeHead(206,{'Content-Type':ct,'Content-Range':`bytes ${s}-${e}/${st.size}`,'Accept-Ranges':'bytes','Content-Length':e-s+1});
    return fs.createReadStream(f,{start:s,end:e}).pipe(res);
  }
  res.writeHead(200,{'Content-Type':ct,'Content-Length':st.size,'Accept-Ranges':'bytes'});
  fs.createReadStream(f).pipe(res);
}).listen(port,()=>console.log('ok '+port));
