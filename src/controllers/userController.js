const getUsers = (req, res) => {
    res.json({
        message: "All Users Show"
    }); 
};

const getUser = (req, res) => {
    res.json({
        message: `The user id is: ${req.params.id}`
    })
}

const createUser = (req, res) => {
    const {name, email, phone, gender} = req.body;
    res.status(201).json({
        message: "User create successfully",
        user: {
            name: name,
            email: email,
            phone: phone,
            gender: gender
        },
    });
}

const updateUser = (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    res.status(201).json({
        message: "User update successfully",
        user: {
            id: id,
            name: name,
            email: email
        }
    })
};

const updateStatus = (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    res.status(200).json({
        message: "Status update successfully",
        user: {
            id: id,
            status: status
        }
    })
}

const deleteUser = (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        message: `${id} this user deleted`
    })

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateStatus,
    deleteUser
};