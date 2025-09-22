import { useSelector } from "react-redux";

const ProfileSection = () => {
    const { name, email, phone, address, photoURL } = useSelector(state => state.auth.user);
    const {user} = useSelector(state => state.auth);
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Information <span className="text-red-500 font-bold">{user.userType === "admin" ? "Admin*" : ""}</span></h2>
            <div className="flex items-center gap-5">
                {
                    photoURL && <div>
                        <img src={photoURL} alt={name} />
                    </div>
                }
                <div className="space-y-4">
                    <div>
                        <span className="font-semibold">Full Name:</span> {name}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {email}
                    </div>

                    {phone && <div>
                        <span className="font-semibold">Phone:</span> {phone}
                    </div>}

                    {address && <div>
                        <span className="font-semibold">Address:</span> {address}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;