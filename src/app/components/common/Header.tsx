import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const supabase = createClientComponentClient();
  const route = useRouter();

  return (
    <div className="flex items-center justify-center w-full p-6 gap-2">
      <h1 className="text-sm font-semibold">Tidy</h1>
      {/* <button
        className="text-white py-2 px-4 rounded-md"
        onClick={() => {
          supabase.auth.signOut();
          route.push("/");
        }}
      >
        <FiLogOut color="black" />
      </button> */}
      <button>
        <BsThreeDots />
      </button>
    </div>
  );
};
