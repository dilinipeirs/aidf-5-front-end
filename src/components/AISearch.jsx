import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setQuery } from "@/lib/features/searchSlice";

export default function AISearch() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const [value, setValue] = useState("");

  // Clear input when query is reset
  useEffect(() => {
    if (query === "") {
      setValue("");
    }
  }, [query]);

  function handleSearch() {
    dispatch(setQuery(value));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="z-10 w-full max-w-lg">
      <div className="relative flex items-center">
        <div className="relative flex-grow">
          <Input
            placeholder="Search for the experience you want" // Short placeholder for mobile
            name="query"
            value={value}
            className="bg-[#1a1a1a] text-sm sm:text-base text-white placeholder:text-white/70 placeholder:text-sm sm:placeholder:text-base sm:placeholder:content-['Describe_your_destination...'] border-0 rounded-full py-6 pl-4 pr-12 sm:pr-32 w-full transition-all"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          type="button"
          className="absolute right-2 h-[80%] my-auto bg-black text-white rounded-full px-2 sm:px-4 flex items-center gap-x-2 border-white border-2 hover:bg-black/80 transition-colors"
          onClick={handleSearch}
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span className="text-sm">AI Search</span>
        </Button>
      </div>
    </div>
  );
}
