export type DealFormData = {
    id?: string
    companyName: string
    businessTurnover: string
    fundingType: string
    purpose: string
    loanAmount: string
    notes: string
}

export type SuggestionsProps = {
    title: string
    id:number
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
    setFormData: React.Dispatch<React.SetStateAction<DealFormData>>
    formData: DealFormData
    skipNextFetch: React.MutableRefObject<boolean>;
  }

