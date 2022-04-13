let http = require('http')
let handlerobj=require ('./serverhandler')
let fs= require('fs')
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': "text/html" });

   let  response=handlerobj.handler(req)
    switch (response) {
        case 'home':
            let html=fs.readFileSync('./home.html','utf8')
             res.write(html)
             
             break
        case 'sign-up' :
            let response=handlerobj.check_exiting_email(req.url)
            if(response==true){
                res.write('email exits')
                

            }else if(response==false){
                handlerobj.save_data(req.url)
                res.write('data saved')

                

            }
            break;

        case 'login':
            let login_response=handlerobj.validation(req.url)
            switch (login_response){
                case "valid info":
                   let  username=req.url.split('/')[2]
                    let html=fs.readFileSync('./user.html','utf8')
                    html = html.replace('{user}', username)
                    res.write(html)
                    
                    break
                case 'wrong passwd':
                    res.writeHead(400,{'Content-Type': "text/html" });
                    res.write("you entered wrong password ")
                    break
                case 'email not found':
                    res.writeHead(400,{'Content-Type': "text/html" });
                    res.write("you entered email doesnt exist please signup")
                    break
            }   




            break
        case 'wrongurl' :
            res.writeHead(404,{'Content-Type': "text/html" });
            res.write('NOT FOUND')

    }

   
res.end()
}).listen(3000)