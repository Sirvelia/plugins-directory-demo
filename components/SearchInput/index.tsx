'use client'

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useTransition, useState } from "react"

export const SearchInput = ({ results }: { results?: SearchResults }) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [placeholder, setPlaceholder] = useState("I need a plugin to help me boost my visibility")

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const query = formData.get("query")
        if (query) {
            startTransition(() => {
                router.push(`/search/${query}`)
            })
        }
    }

    const handleInputFocus = () => {
        setPlaceholder("")
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setPlaceholder("I need a plugin to help me boost my visibility")
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-xl px-4 py-2 border-1 border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-400">
                <input 
                    className="w-full md:min-w-[400px] lg:min-w-[600px] outline-none placeholder:text-neutral-400" 
                    type="text" 
                    name="query" 
                    required 
                    placeholder={placeholder} 
                    defaultValue={results?.search}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                <button type="submit" className="cursor-pointer">
                    <Search size={16} />
                </button>
            </div>
        </form>
    )
}