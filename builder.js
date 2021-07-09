const newSize = 5 ; 
const baseFolder = './dist/images/towebp'; 
 


const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const chalk = require('chalk')
const sizeOf = require('image-size');
const fsExtra = require('fs-extra')

fsExtra.emptyDirSync('./build');
let ncp = require('ncp').ncp;
 
ncp.limit = 16;
 function copyToBuild(){
     
    ncp('./dist', 'build', function (err) {
        if (err) {
          return console.error(err);
        }
       });
       console.log(chalk.green('finish , wait a second ..'));
 } 
 
function makeImages(){ 
const getFiles = function (dir, files_){
    
  files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (let i in files){
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};

console.log(chalk.green('images build min to:'+newSize+' px'));
 
const images = getFiles(baseFolder);
let current =0;
let max= images.length+1;
images.forEach(img => {
    current++;
    const ext = path.extname(img);
    const filename =  path.basename(img ,ext);
    const dirname =path.dirname(img); 
    const outputMin = dirname +'/'+'min-'+ filename + ext; 
    const output480 = dirname +'/'+'480-'+ filename + ext; 
    const outputWebp = dirname +'/'+ filename +   '.webp'; 
    const outputWebpMin = dirname +'/'+'min-'+ filename +  '.webp'; 
    const outputWebp480 = dirname +'/'+'480-'+ filename +  '.webp';  

    if((ext=='.jpg'||ext=='.jpeg'||ext=='.png'||ext=='.gif')&&!filename.includes('min-')&&!filename.includes('480-')){
        
         
        const oldSize = sizeOf(img).width;
        
 
        console.log (img +  ' file '+current+' from '+max+' change width from: ',chalk.blue(oldSize+'px'),'to', chalk.green(newSize+'px'));
       
     sharp(img)
     .resize(newSize)
     .toFile(outputMin, (err,info)=>{
        if(err){
            console.log(chalk.red(err));
        } 
    });   

    sharp(img).webp().toFile(outputWebp, (err,info)=>{
        if(err){
            console.log(chalk.red(err));
        } 
    }); 

    sharp(img).webp().resize(newSize).toFile(outputWebpMin, (err,info)=>{
        if(err){
            console.log(chalk.red(err));
        } 
    });  


        //sizes in pixel
        

    if(oldSize>470){
         sharp(img).webp().resize(480).toFile(outputWebp480, (err,info)=>{
        if(err){
            console.log(chalk.red(err));
        }  
     });  

         sharp(img).resize(480).toFile(output480, (err,info)=>{
        if(err){
            console.log(chalk.red(err));
        }  
     });  
    } else {
        sharp(img).webp().resize(oldSize).toFile(outputWebp480, (err,info)=>{
            if(err){
                console.log(chalk.red(err));
            } 
         });
         sharp(img).resize(oldSize).toFile(output480, (err,info)=>{
            if(err){
                console.log(chalk.red(err));
            }  
         });  
        console.log(chalk.red('image smaller then 480!!!'));
    }
          //sizes in pixel 
  

    } else {
        if (ext!=='.svg'&& ext!=='.webp'&&!filename.includes('min-')&&!filename.includes('480-')){
            console.log(ext)
            console.error(chalk.red('      builder.js            error in extname                         is it img ?  '+  img));
        }
    }
//  if(current==max-1){
    
//  }
}); 
 console.log(chalk.green('images done , copying to build...'));
}
 
 makeImages();
 console.log('it can work in background');
 setTimeout(() => {
    
    copyToBuild();
 }, 2000);

 