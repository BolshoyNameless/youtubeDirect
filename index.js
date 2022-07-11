// Using:
//     Node.js
//     npm install express.js
//     npm install youtube-dl-exec --save

const express = require('express');
const youtubedl = require('youtube-dl-exec');


let router = express();
const port = 3003

router.get("/get-link", async(req, res, next) => {
    // USAGE - http://127.0.0.1:3003/get-link?videoId={videoId}
    const videoId = req.query.videoId

    await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, {
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            format: "22", // 22 - best, then 17, then 18....Google youtube-dl format codes
            getUrl: true,
        referer: `https://www.youtube.com/watch?v=${videoId}`

    }).then(output => {
        console.log(output)
        res.json({link: output})
    })
})


router.listen(port, () => {
    console.log(`Fetching direct video links on port ${port}`)
})