import type { Route } from "./+types/home";
import { SaveAsDraftHome } from "../components/SaveAsDraftHome";
import { data } from "react-router";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const getEnv = (key: string) => {
  // Try both prefixed and non-prefixed versions
  const prefixedKey = `VITE_${key.replace(/^VITE_/, "")}`;
  const directKey = key.replace(/^VITE_/, "");
  
  return (
    import.meta.env[prefixedKey] || 
    import.meta.env[directKey] || 
    process.env[prefixedKey] || 
    process.env[directKey] || 
    ""
  );
};

const supabaseUrl = getEnv("SUPABASE_URL");
const supabaseAnonKey = getEnv("SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Check your environment variables (SUPABASE_URL and SUPABASE_ANON_KEY).");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function loader() {
  // ── Track this visit ──────────────────────────────────────────────
  // Note: Ensure that "site_visits" table has an RLS policy that allows 
  // insertion for the "anon" role if using the anon key.
  try {
    const { error: visitError } = await supabase
      .from("site_visits")
      .insert([{ visited_at: new Date().toISOString() }]);

    if (visitError) {
      console.error("[Loader] Visit tracking failed:", visitError.message, visitError.details, visitError.hint);
    } else {
      console.log("[Loader] Visit logged successfully.");
    }
  } catch (err) {
    console.error("[Loader] Critical error during visit tracking:", err);
  }

  // ── Fetch total visit count ───────────────────────────────────────
  const { count: visitCount, error: countError } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("[Loader] Fetching visit count failed:", countError);
  }

  // ── Fetch latest feedbacks ────────────────────────────────────────
  const { data: feedbacks, error: feedbacksError } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (feedbacksError) {
    console.error("[Loader] Supabase Error:", feedbacksError);
    return { feedbacks: [], visitCount: visitCount ?? 0 };
  }

  console.log(`[Loader] Fetched ${feedbacks?.length || 0} feedbacks. Total visits: ${visitCount}`);
  return { feedbacks: feedbacks || [], visitCount: visitCount ?? 0 };
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "feedback") {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const rating = parseInt(formData.get("rating") as string);
    const message = formData.get("message") as string;

    // Insert into Supabase
    const { error } = await supabase
      .from("feedback")
      .insert([{ name, email, rating, message }]);

    if (error) {
      console.error("Supabase Error:", error);
      return data({ error: "Failed to submit feedback. Please try again." }, { status: 500 });
    }

    return data({ message: "Thank you for your feedback!" }, { status: 200 });
  }

  return data({ message: "Unknown action" }, { status: 400 });
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SaveAsDraft – A Story For A Lifetime" },
    {
      name: "description",
      content:
        "SaveAsDraft – Specializing in untraditional, personalized digital invitations that transform your story into visually compelling designs for weddings and events.",
    },
    { name: "og:title", content: "SaveAsDraft – A Story For A Lifetime" },
    {
      name: "og:description",
      content:
        "Beautiful, custom digital invitations for weddings and events. RSVP, maps, gallery, and more – all in one elegant link.",
    },
  ];
}

export default function Home() {
  return <SaveAsDraftHome />;
}
