import { useState } from "react";
import "./UsersList.css";


const UsersList = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        usertype: "",
    });

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [curentfilterUsers, setCurentFilterUsers] = useState('all');

    const filtrUsers = (filter) => {
        setCurentFilterUsers(filter);
        if (filter === "all") {
            setFilterUsers(users);
        } else {
            setFilterUsers(users.filter((user) => user.usertype === filter));
        }
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData((prevDataForm) => {
            return { ...prevDataForm, [name]: target.value };
        });
    };

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({ ...formData, id: Date.now() }));
    };

    const removeUser = (id) => {
        const filteredUsers = users.filter(user => user.id !== id)
        setUsers(filteredUsers)
    }





    return (
        <div className="usersList">
            <div className="buttonsPanel" >
                <button className="button1" onClick={() => filtrUsers('Admin')}>Wyśwetl tylko adminów</button>
                <button className="button2" onClick={() => filtrUsers('User')}>Wyświet tylko userów</button>
                <button className="button3" onClick={() => filtrUsers('all')}>Wyswietl wszytskich</button>
            </div>



            <form onSubmit={setUser}>
                <label htmlFor="username">User name</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="User name"
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <label htmlFor="email">User email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="User email"
                    onChange={handleInputChange}
                    value={formData.email}
                />
                <label htmlFor="usertype">User type</label>
                <select id="usertype" name="usertype" onChange={handleInputChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button>Save</button>
            </form>

            <div className="list">
                {filterUsers.map((user) => {
                    return (
                        <div className="userItem" key={user.id} onClick={() => removeUser(user.id)}>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.usertype}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default UsersList;