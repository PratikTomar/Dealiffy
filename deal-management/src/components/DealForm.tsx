import { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import type { DealFormData } from "../types";
import CompanySearchDropdown from "./CompanySearchDropdown";
import { toast } from "react-toastify";

const DealForm = () => {
  const [formData, setFormData] = useState<DealFormData>({
    id: Date.now().toString(),
    companyName: "",
    businessTurnover: "0",
    fundingType: "Loans",
    purpose: "",
    loanAmount: "0",
    notes: "",
  });

  const skipNextFetch = useRef(false);
  const debouncedCompanyName = useDebounce(formData.companyName, 1000);

  const { data, loading, fetchData,
    showSuggestions,
    setShowSuggestions
  } = useFetch(`http://localhost:5000/api/companies?q=${debouncedCompanyName}`,
    debouncedCompanyName);


  const resetForm = () => {
    setFormData({
      companyName: "",
      businessTurnover: "0",
      fundingType: "Loans",
      purpose: "",
      loanAmount: "0",
      notes: "",
    });
  };

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!formData.companyName || ((!formData.businessTurnover)) || !formData.fundingType || !formData.purpose || ((!formData.loanAmount))) {
      e.preventDefault();
      toast.error("All the fields are required except notes", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return
    }
    e.preventDefault();
    const newDeal = { ...formData, id: Date.now() };
    const existingDeals = JSON.parse(localStorage.getItem("newDeal") || "[]");
    const updatedDeals = [...existingDeals, newDeal];
    localStorage.setItem("newDeal", JSON.stringify(updatedDeals));
    
    toast.success("Deal successfully added, Go to Deals Dashboars to see all deals", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
    resetForm();
  };

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    fetchData()
  }, [debouncedCompanyName]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4  max-w-xl mx-auto"
    >
      <div className="space-y-2 relative">
        <label htmlFor="companyName" className="text-sm font-medium">Company Name*</label>
        <input type="text" name="companyName" id="companyName" placeholder="Enter Company Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" onChange={formChangeHandler} value={formData.companyName}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setShowSuggestions(false);
            }          
          }}
        />

        {showSuggestions && data?.length > 0 && formData.companyName !== "" && (
          <ul className="border border-t-0 r-0 mt-1 bg-white max-h-40 overflow-y-auto">
            {data?.map((suggestions: any, id: number) => (
              <CompanySearchDropdown id={id} title={suggestions.title} setFormData={setFormData} setShowSuggestions={setShowSuggestions} formData={formData} skipNextFetch={skipNextFetch} />
            ))}
          </ul>
        )}

        {loading && (
          <ul className="border border-t-0 r-0 mt-1 bg-white max-h-40 overflow-y-auto flex align-center justify-center">
           <li className="loader w-36 h-36 border-4 border-blue-500 rounded-full animate-spin"></li>
          </ul>
        )}

        {!loading && data?.length === 0 && formData.companyName !== "" && (
          <ul className="border mt-1 bg-white max-h-40 overflow-y-auto">
            <li className="p-2 hover:bg-blue-100 cursor-pointer">
              No results found, try searching relevant keywords
            </li>
          </ul>
        )}

      </div>
      <div className="space-y-2">
        {" "}
        <label htmlFor="businessTurnover" className="text-sm font-medium">Business Turnover (£)*</label>
        <input type="number" name="businessTurnover" id="businessTurnover" placeholder="Enter Business Turnover" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" onChange={formChangeHandler} value={formData.businessTurnover} />
      </div>

      <div className="space-y-2">
        {" "}
        <label htmlFor="fundingType" className="text-sm font-medium">Funding Type*</label>
        <select name="fundingType" id="fundingType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" onChange={formChangeHandler} value={formData.fundingType}>

          <option value={formData.fundingType}>
            Loans
          </option>
        </select>
      </div>
      <div className="space-y-2">
        {" "}
        <label htmlFor="purpose" className="text-sm font-medium">Purpose*</label>
        <select name="purpose" id="purpose" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer" onChange={formChangeHandler} value={formData.purpose}>
          <option disabled value="">Select Purpose</option>
          <option value="Cash Flow Boost">Cash Flow Boost</option>
          <option value="New Equipment">New Equipment</option>
          <option value="Expansion">Expansion</option>
          <option value="Refinance">Refinance</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="space-y-2">
        {" "}
        <label htmlFor="loanAmount" className="text-sm font-medium">Loan Amount (£)*</label>
        <input type="number" name="loanAmount" id="loanAmount" placeholder="Enter Loan Amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" onChange={formChangeHandler} value={formData.loanAmount} />

      </div>

      <div className="space-y-2">
        {" "}
        <label htmlFor="notes" className="text-sm font-medium">Notes</label>
        <textarea name="notes" id="notes" placeholder="Enter Notes" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" onChange={formChangeHandler} value={formData.notes} />

      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
        Submit
      </button>
    </form>
  );
};

export default DealForm;
