import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { DealFormData } from "../types";
import { toast } from "react-toastify";

const DealTable = () => {
    const [deals, setDeals] = useState<DealFormData[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const storedDeals = localStorage.getItem("newDeal");
        if (storedDeals) setDeals(JSON.parse(storedDeals));
    }, []);

    const handleDelete = (id: string) => {
        const updatedDeals = deals.filter((deal) => deal.id !== id);
        setDeals(updatedDeals);
        localStorage.setItem("newDeal", JSON.stringify(updatedDeals));
        toast.success("Successfully deleted the deal");
    };

    const filteredDeals = deals.filter((deal) =>
        deal.companyName.toLowerCase().includes(search.toLowerCase())
    );

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sortBy = e.target.value;
        let sortedDeals = [...deals];
        if (sortBy === "name") {
            sortedDeals.sort((a, b) => a.companyName.localeCompare(b.companyName));
            toast.success("Successfully sorted by name");
        }
        else if (sortBy === "sortByTurnover") {
            sortedDeals.sort((a, b) => Number(a.businessTurnover) - Number(b.businessTurnover));
            toast.success("Successfully sorted by turnover");
        } else if (sortBy === "sortByPurpose") {
            sortedDeals.sort((a, b) => a.purpose.localeCompare(b.purpose));
            toast.success("Successfully sorted by purpose");
        } else if (sortBy === "sortByAmount") {
            sortedDeals.sort((a, b) => Number(a.loanAmount) - Number(b.loanAmount));
            toast.success("Successfully sorted by loan amount");
        } 
        setDeals(sortedDeals);
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Deals Dashboard</h1>
                <select name="sortBy" id="sortBy" className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer" onChange={handleSort}>
                    <option value="sortBy" disabled selected>Sort By (Ascending) </option>
                    <option value="name">Name</option>
                    <option value="sortByTurnover">Sort By Turnover</option>
                    <option value="sortByPurpose">Sort By Purpose</option>
                    <option value="sortByAmount">Sort By Loan Amount</option>
                </select>
            </div>

            {deals.length > 0 && (
                <input
                    type="text"
                    placeholder="Search by company name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            )}

            {filteredDeals.length > 0 && (
                <div className="overflow-x-auto rounded-md border border-gray-200">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Company</th>
                                <th className="px-4 py-2 text-left">Business Turnover</th>
                                <th className="px-4 py-2 text-left">Funding Type</th>
                                <th className="px-4 py-2 text-left">Purpose</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Notes</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDeals.map((deal) => (
                                <tr key={deal.id} className="border-t">
                                    <td className="px-4 py-2">{deal.companyName}</td>
                                    <td className="px-4 py-2">£{deal.businessTurnover}</td>
                                    <td className="px-4 py-2">{deal.fundingType}</td>
                                    <td className="px-4 py-2">{deal.purpose}</td>
                                    <td className="px-4 py-2">£{deal.loanAmount}</td>
                                    <td className="px-4 py-2">{deal.notes}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(deal.id ?? "0")}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredDeals.length === 0 && (
                <div className="text-center mt-20">
                    <h2 className="text-lg mb-2 text-gray-700">No deals found</h2>
                    <Link to="/new-deal">
                        <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 cursor-pointer transition">
                            Create New Deal
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default DealTable;
