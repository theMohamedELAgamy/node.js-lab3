        let fs= require('fs')
        function handler(req){

               if(req.url=='/' && req.method=='GET')
                {   
                   
                    response='home'
                    
                }else{
                    let request=req.url.split('/')
                    if (request[1]=="sign-up" && req.method=='POST'){
                        response="sign-up"
                    }else if(request[1]=="login" && req.method=='POST'){
                        response='login'
                    }else response="wrongurl"
                }
                return response
                
        }


function check_exiting_email(req){
   let response=false
    let emails=[]
     req=req.split('/')
     const data = fs.readFileSync('auth.txt', 'UTF-8');
     const lines = data.split(/\r?\n/);
     lines.forEach((line) => {
         emails.push(line.split('%%')[0])
        
    });
    for(let i=0;i<emails.length;i++){
        if(emails[i]==req[2]){
             response=true
            break
        }
    }
    return response

     
}
function save_data(req){
    req=req.split('/')
    fs.appendFile('auth.txt', `\n${req[2]}%%${req[3]}%%${req[4]}`, (err) => {
        if (err) {
            throw err;
        }
        console.log("File is updated.");
    });
}
function validation(req){
  
   if( check_exiting_email(req)==true){
        if(check_passwd(req)==true){
            return 'valid info'
        }else{
            return 'wrong passwd'
        }

   }
   else{
       return 'email not found'
   }
}
function check_passwd(req){
     let response=false

    let records=[]
    req=req.split('/')
    const data = fs.readFileSync('auth.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
       records.push(`${line.split('%%')[0]}%%${line.split('%%')[1]}`)
       
   });
   for(let i=0;i<records.length;i++){
       if(records[i]==`${req[2]}%%${req[3]}`){
            response=true
           break
       }
   }
   return response
}
module.exports={
    handler:handler,
    check_exiting_email:check_exiting_email,
    save_data: save_data,
    validation:validation
}
