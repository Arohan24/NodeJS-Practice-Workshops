exports.getPost = (req, res) => {
    res.json({
        posts:[
            {
                title:"First json res"
            },
            {
                title2:"Second para"
            }
    ]
    });
};

