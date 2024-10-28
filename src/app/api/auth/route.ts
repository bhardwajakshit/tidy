import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const { provider } = await req.json();

  if (provider === "google") {
    try {
      const { data, error } =
        await createClientComponentClient().auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo:
              process.env.NEXT_PUBLIC_SITE_URL ||
              "http://localhost:3000/dashboard",
          },
        });

      if (error) throw error;

      return Response.json(data, {
        status: 200,
      });
    } catch (error: any) {
      return Response.json(
        { error: error.message },
        {
          status: 500,
        }
      );
    }
  } else {
    return Response.json({ error: "Invalid provider" });
  }
}
