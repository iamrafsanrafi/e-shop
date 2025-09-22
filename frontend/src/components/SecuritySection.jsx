const SecuritySection = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
            <div className="space-y-4">
                <div>
                    <span className="font-semibold">Change Password:</span> ********
                </div>
                <div>
                    <span className="font-semibold">Two-Factor Authentication:</span> Enabled
                </div>
            </div>
        </div>
    );
};

export default SecuritySection;