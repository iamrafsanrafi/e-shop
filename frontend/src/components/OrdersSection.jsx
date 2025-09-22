const OrdersSection = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Order History</h2>
            <table className="w-full table-auto border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">#12345</td>
                        <td className="border px-4 py-2">2025-08-27</td>
                        <td className="border px-4 py-2">Delivered</td>
                        <td className="border px-4 py-2">$150</td>
                        <td className="border px-4 py-2"><button className="text-blue-500 hover:underline">View</button></td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="border px-4 py-2">#12346</td>
                        <td className="border px-4 py-2">2025-08-20</td>
                        <td className="border px-4 py-2">Shipped</td>
                        <td className="border px-4 py-2">$200</td>
                        <td className="border px-4 py-2"><button className="text-blue-500 hover:underline">View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrdersSection;