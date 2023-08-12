import Parser from 'rss-parser';

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json('method Error');
    }
    let parser = new Parser();
    let ary = new Array();
    (async () => {
        res.setHeader("Content-Type" , "text/html")
           .setHeader("Access-Control-Allow-Methods", "GET")
           .setHeader("Access-Control-Allow-Origin", "*"); // https://1fworks.github.io
        await parser.parseURL('https://api.velog.io/rss/@f_works')
        .then((data)=>{
            data.items.forEach(item => {
                ary.push({"title": item.title, "content": item.content,});
            });
            res.json(ary);
        })
        .catch((e)=>{
            res.status(404).send(e);
        });
    })();
};