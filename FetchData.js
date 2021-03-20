const https = require('https');


/**Function to fetch data
 * from given url
 * parameters: url -> string
 */
let fetchData = async function (url,callback) {
    //check if url not available
    if (!url) {
        callback('no url')
        return;
    }

    //check if url is valid:
    try{
        new URL(url)
    }catch(e){
        callback('not a valid URL');
        return;
    }

    //main https call
    try {
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = "";
            //each time data packet arrives, append to body
            res.on('data', data => {
                body += data;
            });
            //once the stream of data input ends, perform further operations
            res.on('end', () => {
                //return the data to callback function
                callback(null,body);
                return;
             });
        });
    } catch (e) {
        //return error in callback function
        callback(e);
        return;
    }
}
module.exports=fetchData;
