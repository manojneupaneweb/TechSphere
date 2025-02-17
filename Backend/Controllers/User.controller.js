const registerUser = (req, res) => {
    const { name, email, password, role } = req.body;
    
    console.log(name, email, password, role); 

    if (!name || !email || !password || !role) {
        return res.status(400).send("Missing required fields");
    }
    
    res.status(200).send("User registration successful!");
};

export { registerUser };
