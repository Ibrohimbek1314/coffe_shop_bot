import mongoose from "mongoose";

function connection () {
    (async () => {
        try{
            await mongoose.connect(
                'mongodb+srv://Ibragim:fbjkvPx0gQNFM7qZ@cluster0.nmbls.mongodb.net/bot?retryWrites=true&w=majority',
                )
                console.log('Mongoose is connected')
            }catch(err){
                console.log("mawetade");
            }
        })()
    }
    
    export default connection
