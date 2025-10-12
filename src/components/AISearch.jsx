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
            className="bg-ivory-sand text-sm sm:text-base text-charcoal-slate placeholder:text-charcoal-slate/60 placeholder:text-sm sm:placeholder:text-base sm:placeholder:content-['Describe_your_destination...'] border border-warm-taupe rounded-full py-6 pl-4 pr-12 sm:pr-32 w-full transition-all shadow-lg"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          type="button"
          className="absolute right-2 h-[80%] my-auto bg-charcoal-slate text-ivory-sand rounded-full px-2 sm:px-4 flex items-center gap-x-2 border border-warm-taupe hover:bg-sage-mist hover:text-charcoal-slate transition-colors shadow-md"
          onClick={handleSearch}
        >
          <Sparkles className="w-4 h-4 fill-ivory-sand" />
          <span className="text-sm">AI Search</span>
        </Button>
      </div>
    </div>
  );
}
