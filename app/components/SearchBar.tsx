"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) {
      return router.push("/");
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        type="text"
        className="p-2 border-e-black rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-[#847577] w-80 border-[#A6A2A2] text-[#CFD2CD]"
        placeholder="Exploar our shop"
        autoComplete="off"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-[#ffffff] hover:opacity-80 font-semibold border-solid border-[1px] border-[#847577] text-[#847577] p-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
